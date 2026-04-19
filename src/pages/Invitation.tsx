// Public invitation page — the thing guests see.
// Phase 2b: hero composition — invocation + stacked names + hairline divider + date + city.
// Uses tokens from index.css; Arabic fonts swap in automatically via html[dir='rtl'].
import { useTranslation } from 'react-i18next'

export function Invitation() {
  const { t, i18n } = useTranslation()

  // Display font: Arabic display in RTL, Latin serif in LTR. Applied inline since the
  // rest of the page otherwise uses body fonts and we only want this swap at the hero.
  const displayFont =
    i18n.language === 'ar' ? 'var(--font-arabic-display)' : 'var(--font-serif)'

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      {/* Bismillah — always visible, in Amiri regardless of active language */}
      <p
        className="mb-16 opacity-70"
        style={{
          fontFamily: 'var(--font-arabic-body)',
          fontSize: 'var(--fs-invocation)',
        }}
      >
        {t('invocation')}
      </p>

      {/* Name stack — matches the civil wedding card composition */}
      <div
        style={{
          fontFamily: displayFont,
          fontSize: 'var(--fs-display)',
          lineHeight: 'var(--lh-display)',
          letterSpacing: i18n.language === 'ar' ? 'normal' : 'var(--tracking-display)',
        }}
      >
        <div style={{ fontWeight: 600 }}>{t('couple.firstName1')}</div>
        <div
          style={{
            fontStyle: 'italic',
            color: 'var(--color-blush)',
            fontWeight: 400,
            fontSize: '0.6em',
            lineHeight: 1.3,
            margin: '0.1em 0',
          }}
        >
          {t('couple.and')}
        </div>
        <div style={{ fontWeight: 600 }}>{t('couple.firstName2')}</div>
      </div>

      {/* Hairline divider */}
      <div
        className="my-12"
        style={{
          width: 60,
          height: 1,
          backgroundColor: 'var(--color-ink-faint)',
        }}
        aria-hidden
      />

      {/* Date */}
      <p
        className="italic"
        style={{
          fontFamily: displayFont,
          fontSize: 'var(--fs-body-lg)',
        }}
      >
        {t('wedding.dateLong')}
      </p>

      {/* City */}
      <p
        className="mt-2"
        style={{
          fontFamily: displayFont,
          fontSize: 'var(--fs-body)',
          color: 'var(--color-ink-soft)',
        }}
      >
        {t('wedding.city')}
      </p>

      {/* Subtle continuity reference to the civil wedding in Paris */}
      <p
        className="mt-16 uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink-soft)',
        }}
      >
        {t('wedding.afterParis')}
      </p>
    </main>
  )
}
