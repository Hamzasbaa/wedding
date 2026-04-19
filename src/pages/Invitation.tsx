// Public invitation page — composes all sections.
// Hero + section dividers + story + schedule + venues + RSVP.
import { useTranslation } from 'react-i18next'
import { SectionDivider } from '@/components/SectionDivider'
import { Story } from '@/sections/Story'
import { Schedule } from '@/sections/Schedule'
import { Venues } from '@/sections/Venues'
import { Rsvp } from '@/sections/Rsvp'

export function Invitation() {
  const { t, i18n } = useTranslation()

  const displayFont =
    i18n.language === 'ar' ? 'var(--font-arabic-display)' : 'var(--font-serif)'

  return (
    <>
      {/* Hero */}
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <p
          className="mb-20"
          style={{
            fontFamily: 'var(--font-arabic-body)',
            fontSize: 'var(--fs-invocation)',
            color: 'var(--color-ink-soft)',
          }}
        >
          {t('invocation')}
        </p>

        <p
          className="mb-6 uppercase"
          style={{
            fontSize: 'var(--fs-meta)',
            letterSpacing: 'var(--tracking-meta)',
            color: 'var(--color-ink-soft)',
          }}
        >
          {t('wedding.afterParis')}
        </p>

        <div
          style={{
            fontFamily: displayFont,
            fontSize: 'var(--fs-display)',
            lineHeight: 'var(--lh-display)',
            letterSpacing: i18n.language === 'ar' ? 'normal' : 'var(--tracking-display)',
            fontWeight: 600,
          }}
        >
          <div>{t('couple.firstName1')}</div>
          <div
            style={{
              fontStyle: 'italic',
              color: 'var(--color-blush)',
              fontWeight: 400,
              fontSize: '0.4em',
              lineHeight: 1.4,
              margin: '0.15em 0',
            }}
          >
            {t('couple.and')}
          </div>
          <div>{t('couple.firstName2')}</div>
        </div>

        <div
          className="my-12"
          style={{ width: 80, height: 1, backgroundColor: 'var(--color-ink-faint)' }}
          aria-hidden
        />

        <p
          className="max-w-md italic"
          style={{
            fontFamily: displayFont,
            fontSize: 'var(--fs-invitation)',
            lineHeight: 1.4,
          }}
        >
          {t('wedding.invitation')}
        </p>

        <div className="mt-10">
          <p style={{ fontFamily: displayFont, fontSize: 'var(--fs-body-lg)' }}>
            {t('wedding.dateLong')}
          </p>
          <p
            className="mt-1"
            style={{
              fontFamily: displayFont,
              fontSize: 'var(--fs-body)',
              color: 'var(--color-ink-soft)',
            }}
          >
            {t('wedding.city')}
          </p>
        </div>
      </section>

      <SectionDivider />
      <Story />

      <SectionDivider />
      <Schedule />

      <SectionDivider />
      <Venues />

      <SectionDivider />
      <Rsvp />

      <SectionDivider />

      {/* Minimal footer */}
      <footer className="py-12 text-center">
        <p
          className="uppercase"
          style={{
            fontSize: 'var(--fs-meta)',
            letterSpacing: 'var(--tracking-meta)',
            color: 'var(--color-ink-soft)',
          }}
        >
          14.11.2026
        </p>
      </footer>
    </>
  )
}
