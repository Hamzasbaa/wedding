// Live countdown to the wedding: 14 November 2026, 16:00 Casablanca (UTC+1).
// Three stats separated by hairlines — days / hours / minutes.
// Ticks every 60 seconds.
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'

const TARGET = new Date('2026-11-14T15:00:00Z').getTime()

interface Parts {
  days: number
  hours: number
  minutes: number
}

function partsUntil(targetMs: number, nowMs: number): Parts {
  const diff = Math.max(0, targetMs - nowMs)
  const totalMinutes = Math.floor(diff / 60_000)
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes - days * 60 * 24) / 60)
  const minutes = totalMinutes - days * 60 * 24 - hours * 60
  return { days, hours, minutes }
}

export function Countdown() {
  const { t } = useTranslation()
  const [parts, setParts] = useState<Parts>(() => partsUntil(TARGET, Date.now()))

  useEffect(() => {
    const id = setInterval(() => {
      setParts(partsUntil(TARGET, Date.now()))
    }, 60_000)
    return () => clearInterval(id)
  }, [])

  const stats = [
    { value: parts.days, label: t('countdown.days') },
    { value: parts.hours, label: t('countdown.hours') },
    { value: parts.minutes, label: t('countdown.minutes') },
  ]

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <SectionTitle>{t('countdown.title')}</SectionTitle>

      <p
        className="mx-auto mt-4 uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink-soft)',
        }}
      >
        {t('countdown.subtitle')}
      </p>

      <div
        className="mt-12 flex items-stretch justify-center gap-6 sm:gap-12"
        role="timer"
        aria-live="polite"
      >
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-stretch">
            <div className="flex flex-col items-center justify-center px-2">
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </div>
              <div
                className="mt-3 uppercase"
                style={{
                  fontSize: 'var(--fs-meta)',
                  letterSpacing: 'var(--tracking-meta)',
                  color: 'var(--color-ink-soft)',
                }}
              >
                {stat.label}
              </div>
            </div>
            {i < stats.length - 1 && (
              <div
                aria-hidden
                className="mx-3 sm:mx-6"
                style={{ width: 1, backgroundColor: 'var(--color-ink-faint)' }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
