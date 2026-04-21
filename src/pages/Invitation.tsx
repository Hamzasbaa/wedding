// Public invitation page.
//
// Section order follows the "emotional courtship" arc agreed in the audit:
//   1. Hero       — names + date + city + one line in "on" voice
//   2. Story      — three paragraphs + civil-wedding photo + Paris→Casablanca bridge
//   3. Address    — one handwritten line speaking directly to the guest
//   4. RSVP       — the ask, with the live days-until-wedding line built in
//   5. Le jour    — prose placeholder until the venue is confirmed
//   6. Infos      — FAQ (dress, airport, kids, contact)
//   7. Cadeaux    — gated behind a click, labeled En France / Au Maroc
//   8. Farewell   — one warm line, signature, contact fallback
//
// Everything the audit decided to kill (envelope cover, scratch reveal,
// standalone countdown, the repeat-date footer) is gone.
import { useTranslation } from 'react-i18next'
import { SectionDivider } from '@/components/SectionDivider'
import { DirectAddress } from '@/components/DirectAddress'
import { Story } from '@/sections/Story'
import { Rsvp } from '@/sections/Rsvp'
import { LeJour } from '@/sections/LeJour'
import { Infos } from '@/sections/Infos'
import { Cadeaux } from '@/sections/Cadeaux'
import { Farewell } from '@/sections/Farewell'

export function Invitation() {
  return (
    <>
      <Hero />

      <SectionDivider />
      <Story />

      <DirectAddress />

      <Rsvp />

      <SectionDivider />
      <LeJour />

      <SectionDivider />
      <Infos />

      <SectionDivider />
      <Cadeaux />

      <Farewell />
    </>
  )
}

// The hero. Names in a single horizontal pairing on desktop for intimacy;
// stacked on mobile for weight. Subline in first-person plural ("on s'est dit
// oui à Paris"), not third-person faire-part convention.
function Hero() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
      <p
        className="mb-16"
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
        {t('hero.eyebrow')}
      </p>

      {/* Names: horizontal on md+, stacked on mobile. */}
      <h1
        className="flex flex-col items-center md:flex-row md:items-baseline md:justify-center md:gap-8"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--fs-display)',
          lineHeight: 'var(--lh-display)',
          letterSpacing: 'var(--tracking-display)',
          fontWeight: 600,
          color: 'var(--color-ink)',
        }}
      >
        <span>{t('couple.firstName1')}</span>
        <span
          className="my-1 md:my-0"
          style={{
            fontStyle: 'italic',
            color: 'var(--color-blush)',
            fontWeight: 400,
            fontSize: '0.45em',
            lineHeight: 1.2,
          }}
        >
          {t('couple.and')}
        </span>
        <span>{t('couple.firstName2')}</span>
      </h1>

      <div
        className="my-10"
        style={{ width: 60, height: 1, backgroundColor: 'var(--color-ink-faint)' }}
        aria-hidden
      />

      <p
        className="max-w-lg italic"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--fs-invitation)',
          lineHeight: 1.5,
          color: 'var(--color-ink)',
        }}
      >
        {t('hero.subline')}
      </p>

      <div className="mt-10">
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-body-lg)' }}>
          {t('hero.dateLong')}
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--fs-body)',
            color: 'var(--color-ink-soft)',
          }}
        >
          {t('hero.city')}
        </p>
      </div>

      {/* Scroll cue — discreet chevron, auto-fading. */}
      <div
        className="mt-20"
        style={{
          color: 'var(--color-ink-soft)',
          animation: 'hero-scroll-cue 2.6s ease-in-out infinite',
        }}
        aria-hidden
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9 L12 15 L18 9" />
        </svg>
      </div>

      <style>{`
        @keyframes hero-scroll-cue {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50%      { opacity: 0.7; transform: translateY(4px); }
        }
      `}</style>
    </section>
  )
}
