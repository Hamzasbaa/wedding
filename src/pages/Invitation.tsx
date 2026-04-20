// Public invitation page — composes the full flow.
// Envelope (click to open) → hero → scratch reveal → countdown → story →
// schedule → venues → gifts → rsvp → footer.
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionDivider } from '@/components/SectionDivider'
import { EnvelopeCover, wasEnvelopeOpened } from '@/components/EnvelopeCover'
import { ScratchReveal } from '@/sections/ScratchReveal'
import { Countdown } from '@/sections/Countdown'
import { Story } from '@/sections/Story'
import { Schedule } from '@/sections/Schedule'
import { Venues } from '@/sections/Venues'
import { Gifts } from '@/sections/Gifts'
import { Rsvp } from '@/sections/Rsvp'

export function Invitation() {
  const { t } = useTranslation()
  const [envelopeOpen, setEnvelopeOpen] = useState<boolean>(() => wasEnvelopeOpened())

  return (
    <>
      {!envelopeOpen && <EnvelopeCover onOpened={() => setEnvelopeOpen(true)} />}

      {/* Hero */}
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <p
          className="mb-20"
          style={{
            fontFamily: "'Geeza Pro', 'Noto Naskh Arabic', serif",
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
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--fs-display)',
            lineHeight: 'var(--lh-display)',
            letterSpacing: 'var(--tracking-display)',
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
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--fs-invitation)',
            lineHeight: 1.4,
          }}
        >
          {t('wedding.invitation')}
        </p>

        <div className="mt-10">
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-body-lg)' }}>
            {t('wedding.dateLong')}
          </p>
          <p
            className="mt-1"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--fs-body)',
              color: 'var(--color-ink-soft)',
            }}
          >
            {t('wedding.city')}
          </p>
        </div>
      </section>

      <SectionDivider />
      <ScratchReveal />

      <SectionDivider />
      <Countdown />

      <SectionDivider />
      <Story />

      <SectionDivider />
      <Schedule />

      <SectionDivider />
      <Venues />

      <SectionDivider />
      <Gifts />

      <SectionDivider />
      <Rsvp />

      <SectionDivider />

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
