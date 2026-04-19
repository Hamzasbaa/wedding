// "Le déroulé" — the schedule section. Vertical timeline with a hairline on the
// start edge (left in LTR, right in RTL via logical properties), blush dot markers
// on each entry, generous vertical rhythm.
// Times come from i18n; currently placeholders until the venue confirms.
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'

interface ScheduleItem {
  time: string
  label: string
}

export function Schedule() {
  const { t, i18n } = useTranslation()

  const items = t('schedule.items', { returnObjects: true }) as ScheduleItem[]
  const font = i18n.language === 'ar' ? 'var(--font-arabic-display)' : 'var(--font-serif)'

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <SectionTitle>{t('schedule.title')}</SectionTitle>

      <p
        className="mx-auto mt-6 max-w-md text-center italic"
        style={{ color: 'var(--color-ink-soft)', fontSize: 'var(--fs-body)' }}
      >
        {t('schedule.placeholder')}
      </p>

      <ol
        className="mt-12 space-y-10 border-s ps-8"
        style={{ borderColor: 'var(--color-ink-faint)' }}
      >
        {items.map((item) => (
          <li key={item.time} className="relative">
            {/* Blush dot on the timeline */}
            <span
              className="absolute top-2"
              style={{
                insetInlineStart: '-2.25rem',
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: 'var(--color-blush)',
              }}
              aria-hidden
            />
            <div
              style={{
                fontFamily: font,
                fontSize: 'var(--fs-invitation)',
                fontWeight: 600,
                letterSpacing: i18n.language === 'ar' ? 'normal' : '-0.01em',
              }}
            >
              {item.time}
            </div>
            <div
              style={{
                fontSize: 'var(--fs-body)',
                color: 'var(--color-ink-soft)',
                marginTop: '0.25rem',
              }}
            >
              {item.label}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
