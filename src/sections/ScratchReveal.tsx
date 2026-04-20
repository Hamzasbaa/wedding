// Scratch-to-reveal section — sits between Hero and Countdown.
// Non-blocking: guests scroll past it or interact. Three gold coins cover
// the date 14 · 11 · 2026. Drag/click to scratch (or keyboard Enter on a
// focused coin). When all three are >55% cleared, the "On se marie !"
// tagline fades in; the rest of the page is always visible below.
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'

const SCRATCH_THRESHOLD = 0.55
const CIRCLE_SIZE = 140

const DATE_PARTS = ['14', '11', '2026']

export function ScratchReveal() {
  const { t } = useTranslation()
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false])
  const allRevealed = revealed.every(Boolean)

  function handleRevealed(index: number) {
    setRevealed((prev) => {
      if (prev[index]) return prev
      const next = [...prev]
      next[index] = true
      return next
    })
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <SectionTitle>{t('reveal.title')}</SectionTitle>

      <p
        className="mx-auto mt-4 uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink-soft)',
        }}
      >
        {t('reveal.hint')}
      </p>

      <div className="mt-12 flex items-center justify-center gap-4 sm:gap-8">
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
        className="mt-10 italic"
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
    </section>
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

    lastClearCheck.current += 1
    if (lastClearCheck.current % 4 !== 0) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let cleared = 0
    const pixels = imageData.data.length / 4
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++
    }
    if (cleared / pixels > SCRATCH_THRESHOLD) {
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
      style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
    >
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
        aria-label={`Révéler la partie ${index + 1} de la date`}
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
