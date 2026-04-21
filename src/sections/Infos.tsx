// "Infos pratiques" — the FAQ that stops the inbound SMS flood.
// Dress code, airport, kids, contact. Short answers only — if a guest needs
// more, they reach out to the email at the end.
//
// Items are expandable (native <details>) so the section stays short for
// the casual scroller and deep for the planner.
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'
import { Reveal } from '@/components/Reveal'

interface FaqItem {
  q: string
  a: string
}

export function Infos() {
  const { t } = useTranslation()
  const items = t('infos.items', { returnObjects: true }) as FaqItem[]

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <SectionTitle>{t('infos.title')}</SectionTitle>

      <div className="mt-12 flex flex-col">
        {items.map((item, i) => (
          <Reveal key={item.q} delay={i * 100}>
            <FaqRow question={item.q} answer={item.a} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

interface FaqRowProps {
  question: string
  answer: string
}

function FaqRow({ question, answer }: FaqRowProps) {
  return (
    <details
      className="group"
      style={{
        borderTop: '1px solid var(--color-ink-faint)',
      }}
    >
      <summary
        className="flex cursor-pointer items-center justify-between py-5"
        style={{
          listStyle: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--fs-body-lg)',
            color: 'var(--color-ink)',
          }}
        >
          {question}
        </span>
        <span
          aria-hidden
          className="ml-4 transition-transform group-open:rotate-45"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            color: 'var(--color-gold)',
            display: 'inline-flex',
            width: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
          }}
        >
          +
        </span>
      </summary>
      <p
        className="pb-6 pr-10"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--fs-body)',
          lineHeight: 1.7,
          color: 'var(--color-ink-soft)',
        }}
      >
        {answer}
      </p>
    </details>
  )
}
