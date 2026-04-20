// Envelope cover — the signature opening moment.
// Full-bleed envelope illustration filling the viewport. A terracotta wax seal
// stamped "M&H" in Parisienne sits where the flap meets the body. Click the
// envelope → seal scales and fades, flap opens, envelope fades out, the
// invitation below is revealed.
//
// Persistence: sessionStorage key 'envelope-opened' so internal navigation
// doesn't re-trigger. Fresh tab replays.
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const SESSION_KEY = 'envelope-opened'

interface EnvelopeCoverProps {
  onOpened: () => void
}

export function EnvelopeCover({ onOpened }: EnvelopeCoverProps) {
  const { t } = useTranslation()
  const [opening, setOpening] = useState(false)

  useEffect(() => {
    if (!opening) return
    const tid = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      onOpened()
    }, 1400)
    return () => clearTimeout(tid)
  }, [opening, onOpened])

  function handleOpen() {
    if (opening) return
    setOpening(true)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleOpen()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: 'var(--color-paper)',
        opacity: opening ? 0 : 1,
        transition: 'opacity 700ms var(--ease-expo-out) 600ms',
        pointerEvents: opening ? 'none' : 'auto',
      }}
    >
      <button
        type="button"
        onClick={handleOpen}
        onKeyDown={handleKey}
        aria-label={t('envelope.cta')}
        className="relative block cursor-pointer border-none bg-transparent p-0"
        style={{
          width: 'min(95vw, 95vh * 0.72)',
          aspectRatio: '18 / 25',
          maxHeight: '95vh',
          perspective: '1600px',
        }}
      >
        {/* Envelope body — the pocket behind the flap */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#f2ebdf',
            boxShadow:
              '0 1px 0 rgba(61, 46, 53, 0.05), 0 40px 80px -30px rgba(61, 46, 53, 0.25), 0 20px 40px -20px rgba(61, 46, 53, 0.18)',
          }}
        />

        {/* Diagonal fold lines — side gussets, hairlines only */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 140"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M 0 0 L 50 55 L 100 0"
            fill="none"
            stroke="rgba(61, 46, 53, 0.1)"
            strokeWidth="0.35"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 0 140 L 50 85 L 100 140"
            fill="none"
            stroke="rgba(61, 46, 53, 0.1)"
            strokeWidth="0.35"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Upper triangular flap — rotates open */}
        <div
          className="absolute left-0 right-0 top-0"
          style={{
            height: '50%',
            transformOrigin: 'top center',
            transform: opening ? 'rotateX(-175deg)' : 'rotateX(0deg)',
            transition: 'transform 900ms var(--ease-expo-out)',
            transformStyle: 'preserve-3d',
            zIndex: 2,
          }}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 70"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M 0 0 L 100 0 L 50 70 Z" fill="#ebe1d0" />
            <path
              d="M 0 0 L 50 70 L 100 0"
              fill="none"
              stroke="rgba(61, 46, 53, 0.15)"
              strokeWidth="0.35"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Wax seal — on top of everything, centered where flap tip meets body */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: 'min(22vmin, 180px)',
            height: 'min(22vmin, 180px)',
            transform: opening
              ? 'translate(-50%, -50%) scale(1.2) translateY(-14px)'
              : 'translate(-50%, -50%) scale(1)',
            opacity: opening ? 0 : 1,
            transition:
              'transform 600ms var(--ease-expo-out), opacity 600ms var(--ease-expo-out) 200ms',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        >
          <WaxSeal />
        </div>
      </button>

      {/* Call to action below the envelope */}
      <p
        className="absolute italic"
        style={{
          bottom: 'max(2rem, 5vh)',
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--fs-body)',
          color: 'var(--color-ink-soft)',
          opacity: opening ? 0 : 1,
          transition: 'opacity 400ms var(--ease-expo-out)',
        }}
      >
        {t('envelope.cta')}
      </p>
    </div>
  )
}

// Wax seal: SVG with irregular edge (slight wobble in the circle path),
// radial gradient for dome/glossy-matte look, drop shadow for depth.
// "M&H" monogram in Parisienne script, paper-colored with a soft inner shadow.
function WaxSeal() {
  return (
    <div className="relative h-full w-full">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <defs>
          <radialGradient id="wax-dome" cx="38%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#c45248" />
            <stop offset="40%" stopColor="#9e3a32" />
            <stop offset="85%" stopColor="#7a2721" />
            <stop offset="100%" stopColor="#5e1c18" />
          </radialGradient>
          <radialGradient id="wax-gloss" cx="35%" cy="25%" r="25%">
            <stop offset="0%" stopColor="rgba(255, 220, 200, 0.6)" />
            <stop offset="100%" stopColor="rgba(255, 220, 200, 0)" />
          </radialGradient>
          <filter id="wax-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#5a1a15" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Irregular wax disc — slightly wobbly circle like melted wax */}
        <path
          filter="url(#wax-shadow)"
          fill="url(#wax-dome)"
          d="M 50 4
             C 68 4, 84 14, 92 32
             C 98 48, 97 64, 88 78
             C 80 92, 62 98, 48 96
             C 30 94, 14 82, 8 64
             C 4 48, 8 30, 20 18
             C 30 8, 40 4, 50 4 Z"
        />
        {/* Gloss highlight */}
        <ellipse cx="38" cy="30" rx="22" ry="14" fill="url(#wax-gloss)" />
      </svg>

      {/* Monogram */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'min(9vmin, 72px)',
          color: '#f5e6cc',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          transform: 'translateY(-3%)',
          textShadow: '0 1px 1px rgba(0, 0, 0, 0.35), 0 0 6px rgba(255, 220, 180, 0.15)',
        }}
      >
        M&amp;H
      </div>
    </div>
  )
}

export function wasEnvelopeOpened(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(SESSION_KEY) === '1'
}
