// Public invitation page.
//
// Section order (after the second audit — Le jour moved before RSVP so
// guests know what they're signing up for):
//   1. Hero       — names + date + city + "on" voice subline + Arabic mirror
//   2. Story      — 4 paragraphs + civil-wedding photo + Paris→Casablanca photo bridge
//   3. Le jour    — Moroccan wedding timeline + Palais Inès map
//   4. Address    — one handwritten line speaking directly to the guest
//   5. RSVP       — the ask, with the CountdownBadge anchor
//   6. Infos      — FAQ (dress, airport + hotels, kids, contact)
//   7. Cadeaux    — gated behind a click, labeled En France / Au Maroc
//   8. Farewell   — one warm line, signature, contact fallback
//
// Only two section dividers remain: one between hero and story (bridges
// the grand-frame opening into intimate storytelling), one between rsvp
// and infos (emotional ask → practical utility). Everything else relies
// on the section titles + petals for separation.
import { useTranslation } from 'react-i18next'
import { SectionDivider } from '@/components/SectionDivider'
import { DirectAddress } from '@/components/DirectAddress'
import { FallingPetals } from '@/components/FallingPetals'
import { Story } from '@/sections/Story'
import { Rsvp } from '@/sections/Rsvp'
import { LeJour } from '@/sections/LeJour'
import { Infos } from '@/sections/Infos'
import { Cadeaux } from '@/sections/Cadeaux'
import { Farewell } from '@/sections/Farewell'

export function Invitation() {
  return (
    <>
      {/* Ambient blush + gold petals drifting across the whole page. Sits
          behind content (z-0); every section uses the default stacking so
          it appears above the petals. */}
      <FallingPetals />

      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />

        <SectionDivider />
        <Story />

        <LeJour />

        <DirectAddress />

        <Rsvp />

        <SectionDivider />
        <Infos />

        <Cadeaux />

        <Farewell />
      </main>
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

        {/* Arabic mirror — names, date, city in Arabic/RTL.
            A quiet companion for the Arabophone guests (la Dada, parents,
            family from Morocco). Rendered in the same family as the
            invocation so the two Arabic lines feel kin. */}
        <p
          lang="ar"
          dir="rtl"
          className="mt-8"
          style={{
            fontFamily: "'Geeza Pro', 'Noto Naskh Arabic', serif",
            fontSize: 'var(--fs-body)',
            color: 'var(--color-ink-soft)',
            lineHeight: 1.8,
          }}
        >
          {t('hero.arabicMirror')}
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
