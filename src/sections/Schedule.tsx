// "Le déroulé" — horizontal timeline.
// Time capsule pill → icon circle on a hairline → label + one-line subtitle.
// Horizontally scrollable on mobile; fits on desktop.
// Icons are Moroccan-sober: no airplane, no flight metaphor.
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'
import { ScheduleIcon, type IconName } from '@/components/Icons'

interface ScheduleItem {
  time: string
  label: string
  subtitle: string
  icon: IconName
}

export function Schedule() {
  const { t, i18n } = useTranslation()
  const items = t('schedule.items', { returnObjects: true }) as ScheduleItem[]
  const font = i18n.language === 'ar' ? 'var(--font-arabic-display)' : 'var(--font-serif)'

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <SectionTitle>{t('schedule.title')}</SectionTitle>

      <p
        className="mx-auto mt-4 max-w-md text-center italic"
        style={{ color: 'var(--color-ink-soft)', fontSize: 'var(--fs-body)' }}
      >
        {t('schedule.placeholder')}
      </p>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="mt-16 overflow-x-auto pb-4 sm:overflow-visible">
        <ol
          className="relative mx-auto flex min-w-max justify-between gap-6 sm:min-w-0 sm:gap-0"
          style={{ width: 'max-content', maxWidth: '100%' }}
        >
          {/* Hairline crossing the icon row — sits behind circles */}
          <div
            aria-hidden
            className="absolute start-[2.5rem] end-[2.5rem]"
            style={{
              top: '4.5rem',
              height: 1,
              backgroundColor: 'var(--color-ink-faint)',
            }}
          />

          {items.map((item) => (
            <li
              key={item.time}
              className="relative flex flex-1 flex-col items-center text-center"
              style={{ minWidth: '8rem' }}
            >
              {/* Time capsule */}
              <div
                className="uppercase"
                style={{
                  fontFamily: font,
                  fontSize: 'var(--fs-meta)',
                  letterSpacing: i18n.language === 'ar' ? 'normal' : '0.1em',
                  color: 'var(--color-paper)',
                  backgroundColor: 'var(--color-ink)',
                  borderRadius: 999,
                  padding: '0.4rem 0.9rem',
                }}
              >
                {item.time}
              </div>

              {/* Icon circle */}
              <div
                className="mt-5 flex items-center justify-center rounded-full"
                style={{
                  width: 56,
                  height: 56,
                  border: '1px solid var(--color-ink-faint)',
                  backgroundColor: 'var(--color-paper)',
                  color: 'var(--color-gold)',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <ScheduleIcon name={item.icon} size={26} />
              </div>

              {/* Label */}
              <div
                className="mt-4"
                style={{
                  fontFamily: font,
                  fontSize: 'var(--fs-body-lg)',
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                }}
              >
                {item.label}
              </div>

              {/* Subtitle */}
              <div
                className="mt-1 italic"
                style={{
                  fontSize: 'var(--fs-body)',
                  color: 'var(--color-ink-soft)',
                }}
              >
                {item.subtitle}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
