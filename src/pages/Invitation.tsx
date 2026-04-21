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
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionDivider } from '@/components/SectionDivider'
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

        <SectionDivider />
        <LeJour />

        <SectionDivider />
        <LeLieu />

        <SectionDivider />
        <Rsvp />

        <SectionDivider />
        <Infos />

        <SectionDivider />
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

  // The scroll cue has to sit on the viewport edge because hero content
  // overflows 85vh on small phones — if we render it in-flow it lands
  // below the fold and defeats its purpose. Fixed position + fade-on-scroll
  // is the classic "there's more below" pattern.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

      {/* Scroll cue — fixed to viewport bottom so it stays visible even
          when hero content overflows the fold on small phones. Fades out
          once the user starts scrolling (the signal has done its job).
          Label + chevron: the word removes the "is the chevron decorative?"
          ambiguity people were hitting when shared.

          Three nested layers by responsibility:
          - Outer: fixed positioning + scroll-fade
          - Middle (hero-anim-chevron): entrance animation
          - Inner: infinite pulse
          Each layer owns its own `transform`, so the entrance animation
          can't clobber the horizontal centering. */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          opacity: scrolled ? 0 : 1,
          transition: 'opacity 400ms ease-out',
          pointerEvents: 'none',
        }}
      >
        <div className="hero-anim-chevron">
          <div
            className="flex flex-col items-center gap-2.5"
            style={{
              animation: 'hero-scroll-cue 2.4s ease-in-out 1900ms infinite',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.7rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--color-blush)',
              }}
            >
              {t('hero.scrollCue')}
            </span>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9 L12 15 L18 9" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-scroll-cue {
          0%, 100% { opacity: 0.6; transform: translateY(0); }
          50%      { opacity: 0.95; transform: translateY(6px); }
        }
      `}</style>
    </section>
  )
}
