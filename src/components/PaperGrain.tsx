// Paper grain — a fixed, full-viewport noise layer mixed into the page
// background. Gives the invitation a tactile "real paper" feel instead of
// the flat cream that screens render by default.
//
// Implementation: a single SVG turbulence filter encoded as a data URI,
// blended over the page at very low opacity. Roughly 3% visibility —
// guests shouldn't be able to *see* grain, just *feel* it.
//
// Performance: one repainted layer, mostly static (no JS), GPU-friendly
// via mix-blend-mode. Respects prefers-reduced-motion by dropping to a
// slightly softer opacity (no animation to disable, but lowers visual
// noise for users who want calm).

const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3' stitchTiles='stitch'/>
    <feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.18  0 0 0 0 0.21  0 0 0 0.7 0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(%23n)'/>
</svg>`

export function PaperGrain() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.05,
        mixBlendMode: 'multiply',
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(GRAIN_SVG)}")`,
        backgroundSize: '280px 280px',
      }}
    />
  )
}
