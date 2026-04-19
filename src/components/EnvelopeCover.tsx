// Envelope cover — the signature opening moment.
// A centered paper envelope with a wax seal. Click anywhere on the envelope
// (or press Enter/Space on the seal) and the flap opens, the seal lifts off,
// and the whole envelope fades away — revealing the scratch gate beneath.
//
// Persistence: sessionStorage key 'envelope-opened' so internal navigation
// (Admin → home) doesn't re-trigger. Fresh tab re-plays the moment.
//
// A11y: the whole envelope is a button with aria-label; keyboard Enter/Space
// opens it. Reduced-motion respected via the global CSS rule.
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
    const t1 = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      onOpened()
    }, 1400)
    return () => clearTimeout(t1)
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
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
        aria-label="Open the invitation"
        className="relative block cursor-pointer border-none bg-transparent p-0"
        style={{
          width: 'min(420px, 80vw)',
          aspectRatio: '5 / 7',
          perspective: '1200px',
        }}
      >
        {/* Envelope body (back layer — the card behind the flap) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#f4ede3',
            boxShadow:
              '0 1px 0 rgba(61, 46, 53, 0.05), 0 30px 60px -20px rgba(61, 46, 53, 0.2), 0 15px 30px -15px rgba(61, 46, 53, 0.15)',
          }}
        />

        {/* Diagonal fold lines — envelope side gussets, hairlines only */}
        <svg
          className="absolute inset-0"
          viewBox="0 0 100 140"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M 0 0 L 50 55 L 100 0"
            fill="none"
            stroke="rgba(61, 46, 53, 0.08)"
            strokeWidth="0.5"
          />
          <path
            d="M 0 140 L 50 85 L 100 140"
            fill="none"
            stroke="rgba(61, 46, 53, 0.08)"
            strokeWidth="0.5"
          />
        </svg>

        {/* Upper triangular flap — this is what rotates open */}
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
            {/* Flap as a triangle reaching down to the mid-envelope point */}
            <path d="M 0 0 L 100 0 L 50 70 Z" fill="#ece3d5" />
            <path
              d="M 0 0 L 50 70 L 100 0"
              fill="none"
              stroke="rgba(61, 46, 53, 0.12)"
              strokeWidth="0.4"
            />
          </svg>
        </div>

        {/* Wax seal — sits on the flap's tip (center of envelope) */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: 96,
            height: 96,
            marginLeft: -48,
            marginTop: -48,
            zIndex: 3,
            transform: opening ? 'scale(1.15) translateY(-12px)' : 'scale(1)',
            opacity: opening ? 0 : 1,
            transition:
              'transform 500ms var(--ease-expo-out), opacity 500ms var(--ease-expo-out) 200ms',
            pointerEvents: 'none',
          }}
        >
          <WaxSeal />
        </div>

        {/* Names whisper on the lower half of the envelope */}
        <div
          className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-10"
          style={{ height: '50%', zIndex: 1 }}
          aria-hidden
        >
          <div
            className="uppercase"
            style={{
              fontSize: 'var(--fs-meta)',
              letterSpacing: 'var(--tracking-meta)',
              color: 'var(--color-ink-soft)',
            }}
          >
            Mariame & Hamza
          </div>
          <div
            className="mt-2 uppercase"
            style={{
              fontSize: 'var(--fs-meta)',
              letterSpacing: 'var(--tracking-meta)',
              color: 'var(--color-ink-faint)',
            }}
          >
            Casablanca
          </div>
        </div>
      </button>

      {/* Call to action below the envelope */}
      <p
        className="mt-10 italic"
        style={{
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

function WaxSeal() {
  return (
    <div className="relative h-full w-full">
      {/* Outer wax disc with soft drip shadow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 35% 30%, #b84a42 0%, #9b362e 55%, #7a2721 100%)',
          boxShadow:
            'inset 0 -4px 8px rgba(0,0,0,0.25), inset 0 4px 6px rgba(255,255,255,0.15), 0 4px 10px rgba(122, 39, 33, 0.35)',
        }}
      />
      {/* Monogram — Parisienne ampersand, paper-colored */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          fontFamily: 'var(--font-script)',
          fontSize: 56,
          color: '#faf0e0',
          lineHeight: 1,
          transform: 'translateY(-2px)',
          textShadow: '0 1px 1px rgba(0,0,0,0.25)',
        }}
      >
        &amp;
      </div>
    </div>
  )
}

export function wasEnvelopeOpened(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(SESSION_KEY) === '1'
}
