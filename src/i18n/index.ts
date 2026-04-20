// i18n setup — French only for now. Arabic version may come back later.
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from './fr.json'

void i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
  },
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
})

document.documentElement.setAttribute('lang', 'fr')
document.documentElement.setAttribute('dir', 'ltr')

export default i18n
