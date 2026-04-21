// "Notre histoire" — the emotional core of the invitation.
// Two-column on desktop (photo + prose), stacked on mobile. Below the prose:
// the Paris → Casablanca bridge — the single strongest expression of the
// "retrouvailles" brand essence. Two dated dots connected by a dashed line.
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'

export function Story() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <SectionTitle>{t('story.title')}</SectionTitle>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[2fr_3fr] md:items-start md:gap-16">
        {/* Photo — civil wedding, Mairie du 11e */}
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
          <p
            className="italic"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-ink)',
              fontSize: 'var(--fs-invitation)',
            }}
          >
            {t('story.p3')}
          </p>
        </div>
      </div>

      <ParisToCasablancaBridge />
    </section>
  )
}

// The Paris → Casablanca bridge.
// Two dots on a dashed line, labels above (city), dates below.
// Left dot: blush (the civil wedding, cooler season).
// Right dot: gold (the celebration).
// This is the "retrouvailles" visual — the whole point of the site in one diagram.
function ParisToCasablancaBridge() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto mt-20 max-w-2xl px-2" aria-hidden="true">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6">
        {/* Left: Paris */}
        <div className="flex flex-col items-center">
          <span
            className="uppercase"
            style={{
              fontSize: 'var(--fs-meta)',
              letterSpacing: 'var(--tracking-meta)',
              color: 'var(--color-ink-soft)',
            }}
          >
            {t('bridge.parisLabel')}
          </span>
          <Dot color="var(--color-blush)" />
          <span
            className="mt-3"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--fs-body)',
              fontStyle: 'italic',
              color: 'var(--color-ink-soft)',
            }}
          >
            {t('bridge.parisDate')}
          </span>
        </div>

        {/* Middle: dashed line */}
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

        {/* Right: Casablanca */}
        <div className="flex flex-col items-center">
          <span
            className="uppercase"
            style={{
              fontSize: 'var(--fs-meta)',
              letterSpacing: 'var(--tracking-meta)',
              color: 'var(--color-ink-soft)',
            }}
          >
            {t('bridge.casablancaLabel')}
          </span>
          <Dot color="var(--color-gold)" />
          <span
            className="mt-3"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--fs-body)',
              fontStyle: 'italic',
              color: 'var(--color-ink)',
            }}
          >
            {t('bridge.casablancaDate')}
          </span>
        </div>
      </div>
    </div>
  )
}

interface DotProps {
  color: string
}

function Dot({ color }: DotProps) {
  return (
    <span
      className="my-3 block rounded-full"
      style={{
        width: 14,
        height: 14,
        backgroundColor: color,
        boxShadow: `0 0 0 4px var(--color-paper), 0 0 0 5px ${color}40`,
      }}
    />
  )
}
