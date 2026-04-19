// Public invitation page — the thing guests see.
// Phase 0: placeholder hero only. Phase 1 fills in the full structure (story, schedule, venue, RSVP).
import { useTranslation } from 'react-i18next'

export function Invitation() {
  const { t } = useTranslation()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-6 text-sm tracking-widest uppercase opacity-60">{t('home.greeting')}</p>
      <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl">
        {t('couple.firstName1')} <span className="italic opacity-70">{t('couple.and')}</span>{' '}
        {t('couple.firstName2')}
      </h1>
      <p className="mt-8 text-lg">{t('wedding.dateLong')}</p>
      <p className="text-base opacity-70">{t('wedding.city')}</p>
    </main>
  )
}
