// "Notre histoire" — the emotional core.
//
// Structure:
//   1. Section title
//   2. Two-column block — civil wedding portrait + prose
//   3. Three-point photo-bridge telling the arc:
//      Casa 8 nov 2025 (henna / engagement)  — blush ring, photo
//      Paris 11 avril 2026 (civil wedding)    — blush ring, photo
//      Casa 14 novembre 2026 (the celebration) — gold ring, M&H monogram
//
//      The past events wear blush rings and real photos; the future event
//      wears a gold ring and the couple's monogram — the same mark used
//      in the favicon and OG card, signalling "this is what we're
//      inviting you to."
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'
import { Reveal } from '@/components/Reveal'

export function Story() {
  const { t } = useTranslation()

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-16">
      <SectionTitle>{t('story.title')}</SectionTitle>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[2fr_3fr] md:items-start md:gap-16">
        {/* Mairie portrait — the civil wedding */}
        <Reveal
          className="overflow-hidden"
          /* Aspect ratio + backing colour kept on inner div since
             Reveal's wrapper already inherits size via grid cell */
        >
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
        </Reveal>

        {/* Prose — each paragraph reveals in sequence */}
        <div className="space-y-6" style={{ fontSize: 'var(--fs-body-lg)', lineHeight: 1.7 }}>
          <Reveal delay={80}><p>{t('story.p1')}</p></Reveal>
          <Reveal delay={180}><p>{t('story.p2')}</p></Reveal>
          <Reveal delay={280}><p>{t('story.p3')}</p></Reveal>
          <Reveal delay={380}>
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
          </Reveal>
        </div>
      </div>

      <PhotoBridge />
    </section>
  )
}

// The retrouvailles photo-bridge.
// Three points connected by dashed lines — Casablanca 2025, Paris 2026,
// Casablanca 2026. Past events (blush rings) link to the future event
// (gold ring, monogram in place of a photo).
interface BridgePoint {
  kind: 'photo' | 'monogram'
  src?: string
  alt?: string
  labelIdx: number // index into t('bridge.points')
  ringColor: string
  dateColor: string
}

const BRIDGE_POINTS: readonly BridgePoint[] = [
  {
    kind: 'photo',
    src: '/photo-henna.jpg',
    alt: 'Mariame et Hamza, cérémonie traditionnelle marocaine',
    labelIdx: 0,
    ringColor: 'var(--color-blush)',
    dateColor: 'var(--color-ink-soft)',
  },
  {
    kind: 'photo',
    src: '/photo-paris.jpg',
    alt: 'Mariame et Hamza à Paris',
    labelIdx: 1,
    ringColor: 'var(--color-blush)',
    dateColor: 'var(--color-ink-soft)',
  },
  {
    kind: 'monogram',
    labelIdx: 2,
    ringColor: 'var(--color-gold)',
    dateColor: 'var(--color-ink)',
  },
]

interface BridgePointData {
  label: string
  date: string
}

function PhotoBridge() {
  const { t } = useTranslation()
  const points = t('bridge.points', { returnObjects: true }) as BridgePointData[]

  return (
    <div className="mx-auto mt-20 max-w-3xl px-2 sm:mt-24">
      {/* Mobile: stacked vertically, each point has a vertical dashed line
          below it leading into the next. Desktop: horizontal row with
          dashed segments filling the space between points.
          Each point + connector reveals in sequence so the timeline
          literally writes itself as the guest arrives. */}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-4">
        <Reveal><BridgePortrait point={BRIDGE_POINTS[0]} data={points[0]} /></Reveal>
        <Reveal delay={300} className="flex w-full sm:flex-1 sm:items-center sm:justify-center">
          <DashedSegment />
        </Reveal>
        <Reveal delay={500}><BridgePortrait point={BRIDGE_POINTS[1]} data={points[1]} /></Reveal>
        <Reveal delay={800} className="flex w-full sm:flex-1 sm:items-center sm:justify-center">
          <DashedSegment />
        </Reveal>
        <Reveal delay={1000}><BridgePortrait point={BRIDGE_POINTS[2]} data={points[2]} /></Reveal>
      </div>
    </div>
  )
}

// Connects two bridge points. Renders as a short vertical dash on mobile
// and a full-width horizontal dash on desktop — two elements, each hidden
// at the other breakpoint. Simpler than trying to orient a single SVG
// responsively.
function DashedSegment() {
  return (
    <>
      {/* Mobile vertical connector */}
      <svg
        className="sm:hidden"
        width="2"
        height="40"
        viewBox="0 0 2 40"
        preserveAspectRatio="none"
        aria-hidden
      >
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="40"
          stroke="var(--color-ink-faint)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Desktop horizontal connector */}
      <div className="hidden sm:block sm:flex-1" aria-hidden>
        <svg
          className="block w-full"
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
    </>
  )
}

interface BridgePortraitProps {
  point: BridgePoint
  data: BridgePointData
}

// Circular point with a colored ring. Either contains a photo (past events)
// or the couple's Parisienne monogram (future event — the wedding this
// site invites guests to).
function BridgePortrait({ point, data }: BridgePortraitProps) {
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
        {data.label}
      </span>

      <div
        className="relative flex items-center justify-center overflow-hidden rounded-full"
        style={{
          // Bigger circles now that mobile stacks vertically — we have
          // the whole viewport width per point instead of sharing it
          // between three.
          width: 'clamp(110px, 22vw, 140px)',
          aspectRatio: '1',
          backgroundColor:
            point.kind === 'photo' ? 'var(--color-blush)' : 'var(--color-paper)',
          boxShadow: `0 0 0 3px var(--color-paper), 0 0 0 4px ${point.ringColor}, 0 12px 30px -15px rgba(61, 46, 53, 0.35)`,
        }}
      >
        {point.kind === 'photo' ? (
          <img
            src={point.src}
            alt={point.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            aria-label="Mariame et Hamza"
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              color: 'var(--color-gold)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              transform: 'translateY(-4%)',
            }}
          >
            M&amp;H
          </span>
        )}
      </div>

      <figcaption
        className="mt-4 italic"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--fs-body)',
          color: point.dateColor,
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        {data.date}
      </figcaption>
    </figure>
  )
}
