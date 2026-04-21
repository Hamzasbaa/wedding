// Reveal — wraps children so they fade + slide-up when they enter the
// viewport. The whole site gains "reading tempo" from this: each section
// arrives as the guest scrolls to it, instead of being already there.
//
// Uses IntersectionObserver (no layout cost) and disconnects after the
// first intersection — each element animates exactly once per page load.
//
// CSS for the states lives in src/index.css (.reveal / .reveal--visible).
// Timing: 700ms cubic-bezier(0.16, 1, 0.3, 1). Slow enough for editorial
// pace, fast enough to not feel laggy.
//
// Accessibility: respects prefers-reduced-motion (src/index.css forces the
// visible state immediately).
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  // ms — staggers relative to when the element enters the viewport
  delay?: number
  // Tailwind classes passed through on the wrapper
  className?: string
  // For inline wrappers around spans / inline-block content
  as?: 'div' | 'span'
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLDivElement | HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        // Fire a little before the element is fully in view so the
        // animation finishes as the guest reads it.
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      },
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  const Tag = as
  const classes = `reveal ${visible ? 'reveal--visible' : ''} ${className}`.trim()

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLSpanElement>}
      className={classes}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  )
}
