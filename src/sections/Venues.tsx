// "Où" — the venues section. Two cards side-by-side on desktop, stacked on mobile.
// Each card shows the role (Cérémonie / Réception), a placeholder for the venue
// name (currently TBC), and the city. Static until venue is confirmed.
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'

interface VenueCardProps {
  role: string
  name: string
  city: string
}

function VenueCard({ role, name, city }: VenueCardProps) {
  return (
    <article
      className="flex flex-col items-center gap-4 px-6 py-10 text-center"
      style={{ borderTop: `1px solid var(--color-ink-faint)` }}
    >
      <p
        className="uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink-soft)',
        }}
      >
        {role}
      </p>
      <h3
        className="italic"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--fs-invitation)',
          fontWeight: 500,
        }}
      >
        {name}
      </h3>
      <p style={{ fontSize: 'var(--fs-body)', color: 'var(--color-ink-soft)' }}>{city}</p>
    </article>
  )
}

export function Venues() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionTitle>{t('venues.title')}</SectionTitle>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2">
        <VenueCard
          role={t('venues.ceremony.role')}
          name={t('venues.toBeConfirmed')}
          city={t('venues.ceremony.city')}
        />
        <VenueCard
          role={t('venues.reception.role')}
          name={t('venues.toBeConfirmed')}
          city={t('venues.reception.city')}
        />
      </div>
    </section>
  )
}
