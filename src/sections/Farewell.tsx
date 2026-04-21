// Farewell — the last frame of the experience.
// One warm closing line in script + signature + a contact fallback.
// Each element reveals in sequence as the guest scrolls to it.
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/Reveal'

export function Farewell() {
  const { t } = useTranslation()

  return (
    <footer className="mx-auto max-w-xl px-6 pb-20 pt-16 text-center">
      <Reveal>
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
      </Reveal>

      <Reveal delay={200}>
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
      </Reveal>

      {/* Contact fallback — warm sentence case, italic serif, NOT small
          caps. The old caps-meta version read as a website footer; this
          version reads as the last line of a letter. */}
      <Reveal delay={400}>
        <p
          className="mt-10 italic"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--fs-body)',
            color: 'var(--color-ink-soft)',
            lineHeight: 1.55,
          }}
        >
          {t('farewell.contact')}
        </p>
      </Reveal>
    </footer>
  )
}
