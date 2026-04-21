// "Notre histoire" — the emotional core.
//
// Structure:
//   1. Section title
//   2. Two-column block — civil wedding portrait + prose
//   3. Paris → Casablanca photo-bridge — two circular portraits linked by
//      a dashed line. Paris photo sits above a blush ring, Casablanca
//      above a gold ring. This is the "retrouvailles" visual, now
//      embodied by the actual photos (was previously a polaroid strip
//      AND a separate dot-bridge — duplicative; merged into one).
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'

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

      <PhotoBridge />
    </section>
  )
}

// Paris → Casablanca photo-bridge.
// Two circular portraits connected by a dashed line. The portraits ARE
// the retrouvailles: the past (civil wedding, blush ring) linked to the
// future (celebration, gold ring).
function PhotoBridge() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto mt-24 max-w-3xl px-2">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6">
        <BridgePortrait
          src="/photo-paris.jpg"
          alt="Mariame et Hamza à Paris"
          label={t('bridge.parisLabel')}
          date={t('bridge.parisDate')}
          ringColor="var(--color-blush)"
          dateColor="var(--color-ink-soft)"
        />

        <div className="flex items-center justify-center">
          <svg
            className="w-full"
            height="2"
            viewBox="0 0 200 2"
            preserveAspectRatio="none"
            aria-hidden
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

        <BridgePortrait
          src="/photo-henna.jpg"
          alt="Mariame et Hamza, cérémonie traditionnelle"
          label={t('bridge.casablancaLabel')}
          date={t('bridge.casablancaDate')}
          ringColor="var(--color-gold)"
          dateColor="var(--color-ink)"
        />
      </div>
    </div>
  )
}

interface BridgePortraitProps {
  src: string
  alt: string
  label: string
  date: string
  ringColor: string
  dateColor: string
}

// Circular portrait with a colored ring. Paper gap between the photo and
// the ring creates the "pinned-on-paper" effect that echoes the section's
// editorial tone.
function BridgePortrait({
  src,
  alt,
  label,
  date,
  ringColor,
  dateColor,
}: BridgePortraitProps) {
  return (
    <figure className="flex flex-col items-center">
      <span
        className="mb-3 uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink-soft)',
        }}
      >
        {label}
      </span>

      <div
        className="relative overflow-hidden rounded-full"
        style={{
          width: 'clamp(72px, 18vw, 132px)',
          aspectRatio: '1',
          backgroundColor: 'var(--color-blush)',
          boxShadow: `0 0 0 3px var(--color-paper), 0 0 0 4px ${ringColor}, 0 12px 30px -15px rgba(61, 46, 53, 0.35)`,
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <figcaption
        className="mt-4 italic"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--fs-body)',
          color: dateColor,
        }}
      >
        {date}
      </figcaption>
    </figure>
  )
}
