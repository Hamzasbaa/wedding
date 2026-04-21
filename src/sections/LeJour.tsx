// "Le jour" — what to expect on November 14.
//
// A traditional Moroccan wedding at Palais Inès, Casablanca. Guests arrive
// at 6pm for gâteaux and tea, dinner follows, then orchestre and Issawa —
// the signature Moroccan spiritual-music troupe — and dancing until late.
//
// Structure:
//   1. Intro paragraph
//   2. Timeline (simple vertical list on mobile, horizontal on desktop)
//   3. Venue card with Palais Inès details + Google Maps embed
//   4. Directions button
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'
import { PinIcon } from '@/components/Icons'

interface TimelineItem {
  time: string
  label: string
  detail: string
}

export function LeJour() {
  const { t } = useTranslation()
  const items = t('leJour.timeline', { returnObjects: true }) as TimelineItem[]

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionTitle>{t('leJour.title')}</SectionTitle>

      <p
        className="mx-auto mt-10 max-w-2xl text-center"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--fs-invitation)',
          lineHeight: 1.6,
          color: 'var(--color-ink)',
        }}
      >
        {t('leJour.intro')}
      </p>

      <Timeline items={items} />

      <VenueCard />
    </section>
  )
}

interface TimelineProps {
  items: readonly TimelineItem[]
}

function Timeline({ items }: TimelineProps) {
  return (
    <ol className="mt-16 flex flex-col gap-8 md:gap-10" aria-label="Déroulé de la soirée">
      {items.map((item, i) => (
        <li
          key={item.time}
          className="grid grid-cols-[auto_1fr] items-baseline gap-6 sm:gap-9"
        >
          {/* Time — the anchor. Larger display size + gold so each row's
              time feels like a chapter marker, not a tag. */}
          <div
            className="text-right uppercase"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              lineHeight: 1,
              letterSpacing: '-0.01em',
              color: 'var(--color-gold)',
              fontWeight: 500,
              minWidth: '3.5rem',
            }}
          >
            {item.time}
          </div>
          <div
            className="border-l pl-6 sm:pl-8"
            style={{
              borderColor:
                i === items.length - 1 ? 'transparent' : 'var(--color-ink-faint)',
              paddingBottom: i === items.length - 1 ? 0 : '0.75rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--fs-body-lg)',
                fontWeight: 500,
                color: 'var(--color-ink)',
                lineHeight: 1.25,
              }}
            >
              {item.label}
            </div>
            <div
              className="mt-1.5 italic"
              style={{
                fontSize: 'var(--fs-body)',
                color: 'var(--color-ink-soft)',
                lineHeight: 1.55,
              }}
            >
              {item.detail}
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

// Venue card — Palais Inès with address, a map embed, and a "Itinéraire"
// button that opens the place in the guest's maps app (Google by default).
//
// The map uses OpenStreetMap's official embed endpoint — no API key, no
// X-Frame-Options block, works everywhere. Coordinates are approximate
// (Casablanca, near the 20003 postal zone); swap in exact Palais Inès
// coordinates once the final address is confirmed.
//
// Approximate coords: 33.5603° N, -7.6104° W.
const VENUE_LAT = 33.5603
const VENUE_LNG = -7.6104

function VenueCard() {
  const { t } = useTranslation()

  const query = 'Palais Inès Casablanca Maroc'
  // Bounding box: ~1.5km around the marker for a readable zoom.
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
    <article
      className="mt-20 overflow-hidden"
      style={{
        border: '1px solid var(--color-ink-faint)',
        backgroundColor: 'var(--color-paper)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr]">
        {/* Details */}
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p
            className="uppercase"
            style={{
              fontSize: 'var(--fs-meta)',
              letterSpacing: 'var(--tracking-meta)',
              color: 'var(--color-gold)',
            }}
          >
            {t('venue.label')}
          </p>
          <h3
            className="mt-3"
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
            // Disable iframe pointer-events so mobile swipes scroll the
            // page instead of panning the map. Guests interact via the
            // "Itinéraire" button which opens Google Maps directly.
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
  )
}
