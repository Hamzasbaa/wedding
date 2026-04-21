// "Le lieu" — the venue section. Split from Le jour so its section title
// matches the rest of the site's convention (every major chunk gets a
// Parisienne gold script heading).
//
// Contents:
//   - Venue name (Palais Inès) and address
//   - "Itinéraire" button that opens the guest's maps app via a Google
//     Maps deep link
//   - OpenStreetMap iframe for visual reference (pointer-events: none so
//     mobile scrolls pass through cleanly)
//
// Approximate coords: 33.5603° N, -7.6104° W — update when the Palais
// Inès exact coordinates are confirmed.
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'
import { PinIcon } from '@/components/Icons'
import { Reveal } from '@/components/Reveal'

const VENUE_LAT = 33.5603
const VENUE_LNG = -7.6104

export function LeLieu() {
  const { t } = useTranslation()

  const query = 'Palais Inès Casablanca Maroc'
  const delta = 0.012
  const bbox = [
    VENUE_LNG - delta,
    VENUE_LAT - delta,
    VENUE_LNG + delta,
    VENUE_LAT + delta,
  ].join(',')
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${VENUE_LAT},${VENUE_LNG}`
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query,
  )}`

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionTitle>{t('leLieu.title')}</SectionTitle>

      <Reveal delay={120} className="mt-12">
      <article
        className="overflow-hidden"
        style={{
          border: '1px solid var(--color-ink-faint)',
          backgroundColor: 'var(--color-paper)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr]">
          {/* Details */}
          <div className="flex flex-col justify-center p-8 md:p-10">
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 500,
                color: 'var(--color-ink)',
                lineHeight: 1.15,
              }}
            >
              {t('venue.name')}
            </h3>
            <p
              className="mt-3"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--fs-body-lg)',
                color: 'var(--color-ink-soft)',
                lineHeight: 1.5,
              }}
            >
              {t('venue.address')}
            </p>

            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 self-start uppercase transition hover:opacity-80"
              style={{
                fontSize: 'var(--fs-meta)',
                letterSpacing: 'var(--tracking-meta)',
                color: 'var(--color-ink)',
                padding: '0.7rem 1.2rem',
                border: '1px solid var(--color-ink-faint)',
                backgroundColor: 'transparent',
                textDecoration: 'none',
              }}
            >
              <PinIcon size={14} color="var(--color-gold)" />
              {t('venue.directions')}
            </a>
          </div>

          {/* Map */}
          <div
            className="relative"
            style={{
              minHeight: 280,
              aspectRatio: '4 / 3',
              backgroundColor: 'var(--color-blush)',
            }}
          >
            <iframe
              title={t('venue.mapTitle')}
              src={embedSrc}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                border: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </article>
      </Reveal>
    </section>
  )
}
