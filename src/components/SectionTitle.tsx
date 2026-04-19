// Shared section title. Serif italic, mid-weight size, centered.
// Matches the invitation line's tone — not competing with the hero display.
import { useTranslation } from 'react-i18next'

interface SectionTitleProps {
  children: React.ReactNode
}

export function SectionTitle({ children }: SectionTitleProps) {
  const { i18n } = useTranslation()
  const font = i18n.language === 'ar' ? 'var(--font-arabic-display)' : 'var(--font-serif)'

  return (
    <h2
      className="text-center italic"
      style={{
        fontFamily: font,
        fontSize: 'var(--fs-section)',
        lineHeight: 'var(--lh-section)',
        fontWeight: 500,
        letterSpacing: i18n.language === 'ar' ? 'normal' : '-0.02em',
      }}
    >
      {children}
    </h2>
  )
}
