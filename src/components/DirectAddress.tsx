// Direct-address moment — a single handwritten line between the story and
// the RSVP. The site's only break from invitation voice: we (the couple)
// speak directly to the guest. Parisienne script, small, quiet.
//
// The line is clipped from the right and "wipes in" as the guest scrolls
// to it — feels like handwriting being revealed stroke by stroke.
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function DirectAddress() {
  const { t } = useTranslation()
  const ref = useRef<HTMLParagraphElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.4, rootMargin: '0px 0px -40px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      className="mx-auto flex max-w-2xl items-center justify-center px-6 py-20"
      aria-label="Un mot pour vous"
    >
      <p
        ref={ref}
        className="text-center"
        style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          lineHeight: 1.35,
          color: 'var(--color-ink)',
          clipPath: visible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
          transition: 'clip-path 1400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {t('address.line')}
      </p>
    </section>
  )
}
