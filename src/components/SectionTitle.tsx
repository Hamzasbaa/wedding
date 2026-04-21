// Shared section title — Parisienne script in gold.
// Provides the "ornamental warmth" on top of the editorial-minimal base.
//
// On scroll into view, the title settles in: 20px translateY + fade
// over 900ms. Slightly slower than the standard <Reveal> so the title
// feels like the anchor it is for each section.
import { useEffect, useRef, useState } from 'react'

interface SectionTitleProps {
  children: React.ReactNode
}

export function SectionTitle({ children }: SectionTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null)
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
      { threshold: 0.25, rootMargin: '0px 0px -30px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <h2
      ref={ref}
      className={`section-title-reveal text-center ${
        visible ? 'section-title-reveal--visible' : ''
      }`}
      style={{
        fontFamily: 'var(--font-script)',
        fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
        lineHeight: 'var(--lh-section)',
        fontWeight: 400,
        color: 'var(--color-gold)',
      }}
    >
      {children}
    </h2>
  )
}
