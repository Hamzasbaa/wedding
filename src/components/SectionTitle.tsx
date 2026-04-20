// Shared section title — Parisienne script in gold.
// Provides the "ornamental warmth" on top of the editorial-minimal base.

interface SectionTitleProps {
  children: React.ReactNode
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2
      className="text-center"
      style={{
        fontFamily: 'var(--font-script)',
        fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
        lineHeight: 'var(--lh-section)',
        fontWeight: 400,
        color: 'var(--color-gold)',
      }}
    >
      {children}
    </h2>
  )
}
