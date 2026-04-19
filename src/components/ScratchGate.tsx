// Full-viewport opening moment: three scratch circles reveal 14 · 11 · 2026.
// Once all three are mostly cleared (>55% pixels erased), the gate fades out
// and the invitation below takes over.
//
// Persistence: sessionStorage so the gesture re-plays on a fresh tab but not
// on an internal navigation (Admin → home).
//
// Reduced-motion: the gate still appears but scratching is bypassed with a
// single "Entrer" button so no dragging is required.
//
// A11y: each circle is a button with aria-label; keyboard Enter/Space also reveals.
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const SESSION_KEY = 'invitation-opened'
const SCRATCH_THRESHOLD = 0.55 // 55% cleared = revealed
const CIRCLE_SIZE = 140

interface ScratchGateProps {
  onEntered: () => void
}

const DATE_PARTS = ['14', '11', '2026']

export function ScratchGate({ onEntered }: ScratchGateProps) {
  const { t } = useTranslation()
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false])
  const [leaving, setLeaving] = useState(false)
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const allRevealed = revealed.every(Boolean)

  useEffect(() => {
    if (!allRevealed) return
    const t1 = setTimeout(() => setLeaving(true), 1600)
    const t2 = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      onEntered()
    }, 2400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [allRevealed, onEntered])

  function handleRevealed(index: number) {
    setRevealed((prev) => {
      if (prev[index]) return prev
      const next = [...prev]
      next[index] = true
      return next
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
      style={{
        backgroundColor: 'var(--color-paper)',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 700ms var(--ease-expo-out)',
        pointerEvents: leaving ? 'none' : 'auto',
      }}
    >
      <p
        className="mb-4"
        style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          color: 'var(--color-gold)',
          lineHeight: 1,
        }}
      >
        {t('reveal.prompt')}
      </p>

      <p
        className="mb-16 uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink-soft)',
        }}
      >
        {t('reveal.hint')}
      </p>

      <div className="flex items-center gap-4 sm:gap-8">
        {DATE_PARTS.map((value, index) => (
          <ScratchCircle
            key={index}
            index={index}
            value={value}
            revealed={revealed[index]}
            onRevealed={() => handleRevealed(index)}
          />
        ))}
      </div>

      <p
        className="mt-16 italic"
        style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
          color: 'var(--color-ink)',
          opacity: allRevealed ? 1 : 0,
          transform: allRevealed ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 600ms var(--ease-expo-out), transform 600ms var(--ease-expo-out)',
        }}
      >
        {t('reveal.tagline')}
      </p>
    </div>
  )
}

interface ScratchCircleProps {
  index: number
  value: string
  revealed: boolean
  onRevealed: () => void
}

function ScratchCircle({ index, value, revealed, onRevealed }: ScratchCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)
  const lastClearCheck = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = CIRCLE_SIZE * dpr
    canvas.height = CIRCLE_SIZE * dpr
    ctx.scale(dpr, dpr)

    // Gold coin cover — warm, slightly textured via radial gradient.
    const gradient = ctx.createRadialGradient(
      CIRCLE_SIZE / 2,
      CIRCLE_SIZE / 2,
      CIRCLE_SIZE * 0.1,
      CIRCLE_SIZE / 2,
      CIRCLE_SIZE / 2,
      CIRCLE_SIZE / 2,
    )
    gradient.addColorStop(0, '#e4c486')
    gradient.addColorStop(0.6, '#c9a66b')
    gradient.addColorStop(1, '#a88850')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(CIRCLE_SIZE / 2, CIRCLE_SIZE / 2, CIRCLE_SIZE / 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.globalCompositeOperation = 'destination-out'
  }, [])

  function getPointerPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) / rect.width) * CIRCLE_SIZE,
      y: ((e.clientY - rect.top) / rect.height) * CIRCLE_SIZE,
    }
  }

  function scratch(x: number, y: number) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.beginPath()
    ctx.arc(x, y, 26, 0, Math.PI * 2)
    ctx.fill()

    // Throttle percent checks — every few strokes is enough.
    lastClearCheck.current += 1
    if (lastClearCheck.current % 4 !== 0) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let cleared = 0
    const pixels = imageData.data.length / 4
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++
    }
    if (cleared / pixels > SCRATCH_THRESHOLD) {
      // Clear everything for a clean reveal.
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      onRevealed()
    }
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (revealed) return
    isDrawing.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    const { x, y } = getPointerPos(e)
    scratch(x, y)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing.current || revealed) return
    const { x, y } = getPointerPos(e)
    scratch(x, y)
  }

  function handlePointerUp(e: React.PointerEvent<HTMLCanvasElement>) {
    isDrawing.current = false
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onRevealed()
    }
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
      }}
    >
      {/* Revealed value sits underneath, visible as canvas clears. */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 500,
          color: 'var(--color-ink)',
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>
      <canvas
        ref={canvasRef}
        role="button"
        tabIndex={0}
        aria-label={`Reveal date part ${index + 1}`}
        aria-pressed={revealed}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        className="absolute inset-0 cursor-pointer rounded-full touch-none"
        style={{
          width: '100%',
          height: '100%',
          opacity: revealed ? 0 : 1,
          transition: 'opacity 500ms var(--ease-expo-out)',
          pointerEvents: revealed ? 'none' : 'auto',
          outline: 'none',
        }}
      />
    </div>
  )
}

export function wasInvitationOpened(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(SESSION_KEY) === '1'
}
