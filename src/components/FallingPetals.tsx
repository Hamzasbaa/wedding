// Falling petals — a slow, quiet background layer. Blush petals drift down
// from above the viewport, spin gently as they fall, fade in and out. Pure
// CSS transforms so it stays GPU-cheap. One fixed layer behind everything.
//
// Respects prefers-reduced-motion (petals stop moving). Count stays modest
// so mobile battery doesn't complain.
import { useMemo } from 'react'

interface Petal {
  left: number // 0..100 — starting horizontal position (vw)
  size: number // px — petal length
  duration: number // seconds — full fall + spin cycle
  delay: number // seconds — negative so some petals start mid-fall
  drift: number // px — horizontal wiggle amplitude
  color: 'blush' | 'gold' | 'soft'
  rotationStart: number // deg — initial rotation
  spin: number // deg — total spin during fall
}

// Deterministic PRNG so SSR / hydration produces the same petals.
// xmur3-style: 32-bit mulberry.
function makeRng(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generatePetals(count: number, seed = 42): Petal[] {
  const rnd = makeRng(seed)
  const colors: Petal['color'][] = ['blush', 'blush', 'blush', 'gold', 'soft']
  return Array.from({ length: count }, () => {
    const duration = 18 + rnd() * 14 // 18–32s — slow
    return {
      left: rnd() * 100,
      size: 10 + rnd() * 10, // 10–20px
      duration,
      delay: -rnd() * duration, // fully staggered, no sync pulses
      drift: 30 + rnd() * 80, // 30–110px horizontal wobble
      color: colors[Math.floor(rnd() * colors.length)],
      rotationStart: rnd() * 360,
      spin: (rnd() > 0.5 ? 1 : -1) * (180 + rnd() * 360),
    }
  })
}

const PETAL_COUNT = 18

interface FallingPetalsProps {
  // Useful for previewing; default covers the viewport.
  className?: string
}

export function FallingPetals({ className }: FallingPetalsProps) {
  const petals = useMemo(() => generatePetals(PETAL_COUNT), [])

  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {petals.map((p, i) => (
        <PetalSprite key={i} petal={p} />
      ))}

      <style>{`
        @keyframes petal-fall {
          0%   { transform: translate3d(0, -10vh, 0) rotate(var(--rot-start));      opacity: 0; }
          8%   { opacity: var(--peak-opacity); }
          92%  { opacity: var(--peak-opacity); }
          100% { transform: translate3d(var(--drift-x), 110vh, 0) rotate(calc(var(--rot-start) + var(--rot-spin))); opacity: 0; }
        }

        @keyframes petal-sway {
          0%, 100% { margin-inline-start: calc(var(--drift) * -1px); }
          50%      { margin-inline-start: calc(var(--drift) * 1px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .petal-wrap, .petal {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}

interface PetalSpriteProps {
  petal: Petal
}

function PetalSprite({ petal }: PetalSpriteProps) {
  const colorMap = {
    blush: 'var(--color-blush)',
    gold: 'var(--color-gold)',
    soft: 'rgba(232, 199, 195, 0.55)', // softer blush
  }

  const peakOpacity = petal.color === 'gold' ? 0.35 : 0.55

  return (
    <div
      className="petal-wrap"
      style={{
        position: 'absolute',
        top: 0,
        left: `${petal.left}vw`,
        animation: `petal-sway ${petal.duration * 0.5}s ease-in-out infinite alternate`,
        animationDelay: `${petal.delay}s`,
        // CSS custom properties consumed by keyframes
        ['--drift' as string]: String(petal.drift),
      }}
    >
      <div
        className="petal"
        style={{
          width: petal.size,
          height: petal.size * 1.5,
          backgroundColor: colorMap[petal.color],
          borderRadius: '50% 0 50% 50%',
          animation: `petal-fall ${petal.duration}s linear infinite`,
          animationDelay: `${petal.delay}s`,
          willChange: 'transform, opacity',
          ['--rot-start' as string]: `${petal.rotationStart}deg`,
          ['--rot-spin' as string]: `${petal.spin}deg`,
          ['--drift-x' as string]: `${petal.drift * (petal.color === 'gold' ? 0.6 : 1)}px`,
          ['--peak-opacity' as string]: String(peakOpacity),
          filter: petal.color === 'gold' ? 'blur(0.3px)' : undefined,
        }}
      />
    </div>
  )
}
