// "Notre histoire" — the story section, three paragraphs in the couple's voice.
// Two-column layout on desktop (photo + prose), stacked on mobile.
// Drop cap on the first letter of the first paragraph, rendered in blush.
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'

export function Story() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <SectionTitle>{t('story.title')}</SectionTitle>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[2fr_3fr] md:items-start md:gap-16">
        {/* Photo column — drop the civil wedding photo at public/photo-mairie.jpg */}
        <div
          className="overflow-hidden"
          style={{
            aspectRatio: '3 / 4',
            backgroundColor: 'var(--color-blush)',
          }}
        >
          <img
            src="/photo-mairie.jpg"
            alt="Mariame et Hamza, Mairie du 11e arrondissement, 11 avril 2026"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Prose column */}
        <div className="space-y-6" style={{ fontSize: 'var(--fs-body-lg)', lineHeight: 1.7 }}>
          <p
            style={{
              // Drop cap on the first letter via ::first-letter in prose class
            }}
            className="story-lead"
          >
            {t('story.p1')}
          </p>
          <p>{t('story.p2')}</p>
          <p>{t('story.p3')}</p>
        </div>
      </div>
    </section>
  )
}
