// Shared hairline divider used between sections. Centered, 80px, 10% ink.
// Matches the divider inside the hero for visual continuity.
export function SectionDivider() {
  return (
    <div
      className="mx-auto my-24"
      style={{ width: 80, height: 1, backgroundColor: 'var(--color-ink-faint)' }}
      aria-hidden
    />
  )
}
