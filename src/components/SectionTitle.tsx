// Shared section title.
// Latin: Parisienne script in gold — the "ornamental warmth" the references had.
// Arabic: keeps Aref Ruqaa (already calligraphic) so we don't translate a Latin
// cursive metaphor into an RTL script where it would read as noise.
import { useTranslation } from 'react-i18next'

interface SectionTitleProps {
  children: React.ReactNode
}

export function SectionTitle({ children }: SectionTitleProps) {
  const { i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  return (
    <h2
      className="text-center"
      style={{
        fontFamily: isArabic ? 'var(--font-arabic-display)' : 'var(--font-script)',
        fontSize: isArabic ? 'var(--fs-section)' : 'clamp(2.5rem, 7vw, 5.5rem)',
        lineHeight: 'var(--lh-section)',
        fontWeight: isArabic ? 500 : 400,
        color: isArabic ? 'var(--color-ink)' : 'var(--color-gold)',
        letterSpacing: isArabic ? 'normal' : '0',
      }}
    >
      {children}
    </h2>
  )
}
