// Direct-address line — the site's one break from invitation voice,
// where we (the couple) speak directly to the guest in Parisienne script.
//
// Rendered inline inside the Rsvp section, right above the deadline,
// so the emotional appeal sits immediately before the ask.
//
// Reveals on scroll via a soft fade + slight upward drift. (We tried a
// clip-path left-to-right "handwriting" wipe but it made the element's
// effective width 0, which prevented IntersectionObserver from firing —
// the element stayed permanently invisible. Opacity-based reveal is
// boring but reliable.)
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface DirectAddressProps {
  className?: string
}

export function DirectAddress({ className = '' }: DirectAddressProps) {
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
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <p
      ref={ref}
      className={`mx-auto max-w-xl text-center ${className}`.trim()}
      style={{
        fontFamily: 'var(--font-script)',
        fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
        lineHeight: 1.35,
        color: 'var(--color-ink)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition:
          'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {t('address.line')}
    </p>
  )
}
