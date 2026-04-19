// Small top-right toggle that swaps between French and Arabic.
// The button label shows the OTHER language (the one you'd switch to).
import { useTranslation } from 'react-i18next'
import type { SupportedLanguage } from '@/i18n'

export function LanguageToggle() {
  const { i18n, t } = useTranslation()

  const next: SupportedLanguage = i18n.language === 'ar' ? 'fr' : 'ar'

  return (
    <button
      type="button"
      onClick={() => void i18n.changeLanguage(next)}
      className="fixed top-4 end-4 z-10 rounded-full border border-current/20 bg-white/60 px-3 py-1 text-sm backdrop-blur transition hover:bg-white"
      aria-label={`Switch to ${next === 'ar' ? 'Arabic' : 'French'}`}
    >
      {t('language.switchTo')}
    </button>
  )
}
