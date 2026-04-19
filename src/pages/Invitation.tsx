// Public invitation page — the thing guests see.
// Hero composition revised via refactoring-ui skill: added mid-weight invitation line
// (secondary tier), kicker pattern for "après Paris", tighter hierarchy, calmer scale.
import { useTranslation } from 'react-i18next'

export function Invitation() {
  const { t, i18n } = useTranslation()

  const displayFont =
    i18n.language === 'ar' ? 'var(--font-arabic-display)' : 'var(--font-serif)'

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      {/* Bismillah — sacred opener, always visible in Amiri regardless of language */}
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

      {/* Kicker — anchors the continuity with the Paris civil wedding */}
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

      {/* Name stack — primary hierarchy level, matches the civil wedding card */}
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

      {/* Hairline divider */}
      <div
        className="my-12"
        style={{
          width: 80,
          height: 1,
          backgroundColor: 'var(--color-ink-faint)',
        }}
        aria-hidden
      />

      {/* Invitation phrase — secondary tier, the missing mid-weight element */}
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

      {/* Date + city — tertiary tier, tightly grouped */}
      <div className="mt-10">
        <p
          style={{
            fontFamily: displayFont,
            fontSize: 'var(--fs-body-lg)',
          }}
        >
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
    </main>
  )
}
