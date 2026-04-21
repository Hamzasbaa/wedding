// "Notre histoire" — the emotional core.
//
// Structure:
//   1. Section title
//   2. Two-column block (photo + prose) on desktop, stacked on mobile
//   3. Polaroid strip — 3 candid photos (NYC, Paris, Moroccan engagement)
//      with slight rotations and a light overlap for texture
//   4. Paris → Casablanca bridge — the retrouvailles visual
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'

interface Polaroid {
  src: string
  alt: string
  caption: string
  rotation: number // deg
}

const POLAROIDS: readonly Polaroid[] = [
  {
    src: '/photo-paris.jpg',
    alt: 'Mariame et Hamza à Paris, Tour Eiffel en arrière-plan',
    caption: 'Paris',
    rotation: -3,
  },
  {
    src: '/photo-nyc-sunset.jpg',
    alt: 'Mariame et Hamza à Central Park, coucher de soleil sur New York',
    caption: 'New York',
    rotation: 2,
  },
  {
    src: '/photo-henna.jpg',
    alt: 'Mariame et Hamza en tenue traditionnelle marocaine',
    caption: 'Casablanca',
    rotation: -1,
  },
]

export function Story() {
  const { t } = useTranslation()

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-16">
      <SectionTitle>{t('story.title')}</SectionTitle>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[2fr_3fr] md:items-start md:gap-16">
        {/* Mairie portrait — the civil wedding */}
        <div
          className="overflow-hidden"
          style={{
            aspectRatio: '3 / 4',
            backgroundColor: 'var(--color-blush)',
          }}
        >
          <img
            src="/photo-mairie.jpg"
            alt="Mariame et Hamza, Mairie du 11e arrondissement, 11 avril 2026"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Prose */}
        <div
          className="space-y-6"
          style={{ fontSize: 'var(--fs-body-lg)', lineHeight: 1.7 }}
        >
          <p>{t('story.p1')}</p>
          <p>{t('story.p2')}</p>
          <p>{t('story.p3')}</p>
          <p
            className="italic"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-ink)',
              fontSize: 'var(--fs-invitation)',
            }}
          >
            {t('story.p4')}
          </p>
        </div>
      </div>

      <PolaroidStrip />

      <ParisToCasablancaBridge />
    </section>
  )
}

// Three photos shown as hand-placed polaroids. Light rotation, small overlap,
// a gentle hover tilt on desktop so they feel tangible.
function PolaroidStrip() {
  return (
    <div className="mt-20">
      <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-10">
        {POLAROIDS.map((p) => (
          <PolaroidCard key={p.src} polaroid={p} />
        ))}
      </div>
    </div>
  )
}

interface PolaroidCardProps {
  polaroid: Polaroid
}

function PolaroidCard({ polaroid }: PolaroidCardProps) {
  return (
    <figure
      className="group transition-transform duration-500 ease-out hover:scale-[1.03]"
      style={{
        width: 'min(70vw, 220px)',
        transform: `rotate(${polaroid.rotation}deg)`,
        backgroundColor: '#fff',
        padding: '12px 12px 44px',
        boxShadow:
          '0 1px 0 rgba(61, 46, 53, 0.06), 0 20px 40px -25px rgba(61, 46, 53, 0.35), 0 8px 20px -15px rgba(61, 46, 53, 0.22)',
      }}
    >
      <img
        src={polaroid.src}
        alt={polaroid.alt}
        loading="lazy"
        style={{
          width: '100%',
          aspectRatio: '3 / 4',
          objectFit: 'cover',
          display: 'block',
          backgroundColor: 'var(--color-blush)',
        }}
      />
      <figcaption
        className="absolute bottom-3 left-0 right-0 text-center uppercase"
        style={{
          fontFamily: 'var(--font-script)',
          fontSize: '1rem',
          color: 'var(--color-ink-soft)',
          letterSpacing: '0.05em',
          textTransform: 'none',
        }}
      >
        {polaroid.caption}
      </figcaption>
    </figure>
  )
}

// Paris → Casablanca bridge.
// Two dots on a dashed line: blush (Paris, the civil wedding) → gold (Casablanca,
// the celebration). The whole point of the site in one diagram.
function ParisToCasablancaBridge() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto mt-20 max-w-2xl px-2" aria-hidden="true">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6">
        <BridgeEndpoint
          label={t('bridge.parisLabel')}
          date={t('bridge.parisDate')}
          color="var(--color-blush)"
          dateColor="var(--color-ink-soft)"
        />

        <div className="flex items-center justify-center">
          <svg
            className="w-full"
            height="2"
            viewBox="0 0 200 2"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="1"
              x2="200"
              y2="1"
              stroke="var(--color-ink-faint)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        <BridgeEndpoint
          label={t('bridge.casablancaLabel')}
          date={t('bridge.casablancaDate')}
          color="var(--color-gold)"
          dateColor="var(--color-ink)"
        />
      </div>
    </div>
  )
}

interface BridgeEndpointProps {
  label: string
  date: string
  color: string
  dateColor: string
}

function BridgeEndpoint({ label, date, color, dateColor }: BridgeEndpointProps) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink-soft)',
        }}
      >
        {label}
      </span>
      <span
        className="my-3 block rounded-full"
        style={{
          width: 14,
          height: 14,
          backgroundColor: color,
          boxShadow: `0 0 0 4px var(--color-paper), 0 0 0 5px ${color}40`,
        }}
      />
      <span
        className="mt-3 italic"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--fs-body)',
          color: dateColor,
        }}
      >
        {date}
      </span>
    </div>
  )
}
