// "Le jour" — what to expect on November 14.
//
// A traditional Moroccan wedding at Palais Inès. Issawa opens the
// evening at 6pm, orchestre takes over at 8pm for the night, dinner
// at 10pm, and we dance until 2am.
//
// Structure:
//   1. Intro paragraph
//   2. Timeline (vertical list)
//
// The venue card used to live here but was split into its own "Le lieu"
// section so the section title matches the style convention — every
// major chunk gets a Parisienne gold script heading.
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'
import { Reveal } from '@/components/Reveal'

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

      <Reveal delay={120}>
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
      </Reveal>

      <Timeline items={items} />
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
        <li key={item.time}>
          <Reveal
            delay={i * 120}
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
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
