// i18n setup — French by default, Arabic as the secondary language.
// Keeps the selection in localStorage and updates <html dir> + <html lang>
// whenever the language changes, so RTL swaps automatically.
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import fr from './fr.json'
import ar from './ar.json'

export type SupportedLanguage = 'fr' | 'ar'

const resources = {
  fr: { translation: fr },
  ar: { translation: ar },
} as const

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'ar'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

function applyDocumentDirection(lng: string): void {
  const dir = lng === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.setAttribute('lang', lng)
  document.documentElement.setAttribute('dir', dir)
}

applyDocumentDirection(i18n.language)
i18n.on('languageChanged', applyDocumentDirection)

export default i18n
