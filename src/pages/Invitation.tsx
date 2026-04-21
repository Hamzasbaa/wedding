// Public invitation page.
//
// Section order:
//   1. Hero       — invocation + Quranic verse + names + date + city + Arabic mirror
//   2. Story      — 4 paragraphs + civil-wedding photo + 3-point photo bridge
//   3. Le jour    — Moroccan wedding timeline
//   4. Le lieu    — Palais Inès with address + map
//   5. Address    — one handwritten line speaking directly to the guest
//   6. RSVP       — the ask, with the CountdownBadge anchor
//   7. Infos      — FAQ (Tenue, Se déplacer, Hôtels, Les enfants)
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
import { PaperGrain } from '@/components/PaperGrain'
import { Story } from '@/sections/Story'
import { Rsvp } from '@/sections/Rsvp'
import { LeJour } from '@/sections/LeJour'
import { LeLieu } from '@/sections/LeLieu'
import { Infos } from '@/sections/Infos'
import { Farewell } from '@/sections/Farewell'

export function Invitation() {
  return (
    <>
      {/* Paper grain — one fixed noise layer at ~5% opacity that makes
          the flat cream read as paper. Sits behind everything. */}
      <PaperGrain />

      {/* Ambient blush + gold petals drifting across the whole page. Sits
          behind content (z-0); every section uses the default stacking so
          it appears above the petals. */}
      <FallingPetals />

      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />

        <SectionDivider />
        <Story />

        <LeJour />

        <LeLieu />

        <DirectAddress />

        <Rsvp />

        <SectionDivider />
        <Infos />

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
    <section className="mx-auto flex min-h-[85vh] max-w-4xl flex-col items-center justify-center px-6 py-12 text-center md:min-h-screen md:py-20">
      <p
        className="hero-anim-invoc"
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: "'Geeza Pro', 'Noto Naskh Arabic', serif",
          fontSize: 'var(--fs-invocation)',
          color: 'var(--color-ink-soft)',
        }}
      >
        {t('invocation')}
      </p>

      {/* Quranic verse (Ar-Rum 30:21) — the "mawaddah wa rahmah" verse,
          traditionally recited at Muslim weddings. Smaller than the
          bismillah, max-width to wrap gracefully. */}
      <p
        className="hero-anim-invoc mx-auto mb-10 mt-4 max-w-md md:mb-14"
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: "'Geeza Pro', 'Noto Naskh Arabic', serif",
          fontSize: 'var(--fs-body)',
          color: 'var(--color-ink-soft)',
          lineHeight: 1.9,
        }}
      >
        {t('verse')}
      </p>

      {/* Names: horizontal on md+, stacked on mobile. Each piece animates
          in on page load with its own delay — left name slides in from
          the left, ampersand scales in, right name slides in from the
          right. Feels like an invitation being signed. */}
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
        <span className="hero-anim-left">{t('couple.firstName1')}</span>
        {/* Ampersand in Parisienne — consistent with "script = tender
            accents." Reserves this one flourish for the couple, echoing
            the section titles. */}
        <span
          className="hero-anim-amp my-1 md:my-0"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-script)',
            color: 'var(--color-blush)',
            fontWeight: 400,
            fontSize: '0.55em',
            lineHeight: 1.2,
            letterSpacing: 'normal',
          }}
        >
          {t('couple.and')}
        </span>
        <span className="hero-anim-right">{t('couple.firstName2')}</span>
      </h1>

      <div
        className="hero-anim-divider my-8 md:my-10"
        style={{ width: 60, height: 1, backgroundColor: 'var(--color-ink-faint)' }}
        aria-hidden
      />

      <p
        className="hero-anim-subline max-w-lg italic"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--fs-invitation)',
          lineHeight: 1.5,
          color: 'var(--color-ink)',
        }}
      >
        {t('hero.subline')}
      </p>

      <div className="hero-anim-where mt-8 md:mt-10">
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

        {/* Arabic mirror — names, date, city stacked RTL.
            Same structure as the French lines above (names / date / city)
            so it reads as a genuine translation, not decoration. */}
        <div
          lang="ar"
          dir="rtl"
          className="hero-anim-arabic mt-8"
          style={{
            fontFamily: "'Geeza Pro', 'Noto Naskh Arabic', serif",
            color: 'var(--color-ink-soft)',
            lineHeight: 1.7,
          }}
        >
          <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--color-ink)' }}>
            {t('hero.arabicNames')}
          </p>
          <p className="mt-1" style={{ fontSize: 'var(--fs-body)' }}>
            {t('hero.arabicDate')}
          </p>
          <p style={{ fontSize: 'var(--fs-body)' }}>
            {t('hero.arabicCity')}
          </p>
        </div>
      </div>

      {/* Scroll cue — outer div handles the fade-in on page load;
          inner div handles the infinite gentle pulse. Two layers so
          the entrance animation (via className) and the ambient pulse
          (via inline style) don't conflict on the `animation` property. */}
      <div className="hero-anim-chevron mt-10 md:mt-16" aria-hidden>
        <div
          style={{
            color: 'var(--color-ink-soft)',
            animation: 'hero-scroll-cue 2.6s ease-in-out 2800ms infinite',
          }}
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
