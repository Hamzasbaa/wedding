// "Le jour" — merged schedule + venue until the lieu is confirmed.
// Replaces the previous empty-cards Venues section and the placeholder-times
// Schedule section. One paragraph of what to expect + one line of honest
// "details coming" — better than two half-built sections.
//
// When the venue is confirmed: reintroduce a fuller layout here — map,
// timeline, hotel list.
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'

export function LeJour() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto max-w-2xl px-6 py-16 text-center">
      <SectionTitle>{t('leJour.title')}</SectionTitle>

      <p
        className="mx-auto mt-10"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--fs-invitation)',
          lineHeight: 1.6,
          color: 'var(--color-ink)',
        }}
      >
        {t('leJour.body')}
      </p>

      <p
        className="mx-auto mt-8 italic"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--fs-body)',
          color: 'var(--color-ink-soft)',
          lineHeight: 1.6,
        }}
      >
        {t('leJour.venueNote')}
      </p>

      <p
        className="mx-auto mt-3 uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink-soft)',
        }}
      >
        {t('leJour.timelineNote')}
      </p>
    </section>
  )
}
