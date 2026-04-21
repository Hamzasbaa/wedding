// Farewell — the last frame of the experience.
// Replaces the old footer that just repeated the date. One warm closing line
// in script + signature + a contact fallback.
import { useTranslation } from 'react-i18next'

export function Farewell() {
  const { t } = useTranslation()

  return (
    <footer className="mx-auto max-w-xl px-6 pb-20 pt-16 text-center">
      <p
        style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          lineHeight: 1.2,
          color: 'var(--color-gold)',
        }}
      >
        {t('farewell.line')}
      </p>

      <p
        className="mt-4 italic"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--fs-body-lg)',
          color: 'var(--color-ink)',
        }}
      >
        {t('farewell.signoff')}
      </p>

      <p
        className="mt-10 uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink-soft)',
        }}
      >
        {t('farewell.contact')}
      </p>
    </footer>
  )
}
