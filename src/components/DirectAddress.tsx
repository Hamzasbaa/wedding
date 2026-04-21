// Direct-address moment — a single handwritten line between the story and
// the RSVP. The site's only break from invitation voice: we (the couple)
// speak directly to the guest. Parisienne script, small, quiet.
import { useTranslation } from 'react-i18next'

export function DirectAddress() {
  const { t } = useTranslation()

  return (
    <section
      className="mx-auto flex max-w-2xl items-center justify-center px-6 py-20"
      aria-label="Un mot pour vous"
    >
      <p
        className="text-center"
        style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          lineHeight: 1.35,
          color: 'var(--color-ink)',
        }}
      >
        {t('address.line')}
      </p>
    </section>
  )
}
