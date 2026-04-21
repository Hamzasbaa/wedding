// "Votre réponse" — the RSVP form. The highest-value section on the site.
//
// Flow:
//   1. Subtitle shows live days-until-wedding + deadline in one line.
//   2. Name + email.
//   3. Attending: yes / pas cette fois — two big buttons.
//   4. If yes → guest counters (adults + children) + dietary.
//   5. Free-text message (optional, always visible).
//   6. Submit → Supabase → warm confirmation screen.
//
// Errors are surfaced inline — no silent failures.
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import confetti from 'canvas-confetti'
import { SectionTitle } from '@/components/SectionTitle'
import { PaperPlaneIcon } from '@/components/Icons'
import { supabase } from '@/lib/supabase'

// Palette-matched confetti burst fired when a guest confirms attendance.
// Two shots from opposite corners for a wider spread — feels like a rice
// throw, not a birthday cake.
function fireCelebration(): void {
  const palette = ['#E8C7C3', '#C9A66B', '#3D2E35', '#FAF7F2']
  const defaults = {
    startVelocity: 40,
    ticks: 220,
    scalar: 0.9,
    colors: palette,
  }

  confetti({ ...defaults, particleCount: 70, spread: 70, angle: 60, origin: { x: 0, y: 0.7 } })
  confetti({ ...defaults, particleCount: 70, spread: 70, angle: 120, origin: { x: 1, y: 0.7 } })
  setTimeout(() => {
    confetti({ ...defaults, particleCount: 50, spread: 100, origin: { y: 0.55 } })
  }, 180)
}

type Attending = 'yes' | 'no' | null

// Schema mirrors the Supabase table defined in supabase/migrations/0001_init.sql.
const rsvpSchema = z.object({
  guest_name: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  attending: z.boolean(),
  plus_one_name: z.string().optional(),
  dietary_notes: z.string().optional(),
  song_request: z.string().optional(),
  message: z.string().optional(),
  language: z.literal('fr'),
})

type RsvpInput = z.infer<typeof rsvpSchema>

// Target: 14 November 2026, 16:00 Casablanca (UTC+1) — matches Countdown's TARGET.
const TARGET_MS = new Date('2026-11-14T15:00:00Z').getTime()

function daysUntilWedding(nowMs: number): number {
  return Math.max(0, Math.ceil((TARGET_MS - nowMs) / (1000 * 60 * 60 * 24)))
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function Rsvp() {
  const { t } = useTranslation()
  const [attending, setAttending] = useState<Attending>(null)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [status, setStatus] = useState<Status>('idle')
  const [days, setDays] = useState<number>(() => daysUntilWedding(Date.now()))

  useEffect(() => {
    // Refresh the day-count once an hour — nobody needs second-level precision.
    const id = setInterval(() => setDays(daysUntilWedding(Date.now())), 60 * 60 * 1000)
    return () => clearInterval(id)
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (attending === null) return

    const form = e.currentTarget
    const data = new FormData(form)

    const payload: RsvpInput = {
      guest_name: String(data.get('guest_name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      attending: attending === 'yes',
      dietary_notes:
        attending === 'yes'
          ? String(data.get('dietary_notes') ?? '').trim() || undefined
          : undefined,
      message: String(data.get('message') ?? '').trim() || undefined,
      language: 'fr',
    }

    const parsed = rsvpSchema.safeParse(payload)
    if (!parsed.success) {
      setStatus('error')
      return
    }

    setStatus('submitting')

    // plus_one_name is reused here to encode adults/children counts as a simple
    // "3 adultes · 1 enfant" string — keeps the DB shape stable without a
    // migration, and the admin page can parse it if needed.
    const guestCount =
      attending === 'yes'
        ? `${adults} adulte${adults > 1 ? 's' : ''}${
            children > 0 ? ` · ${children} enfant${children > 1 ? 's' : ''}` : ''
          }`
        : undefined

    try {
      const { error } = await supabase.from('rsvps').insert({
        ...parsed.data,
        plus_one_name: guestCount,
      })
      if (error) throw error
      setStatus('success')
      if (attending === 'yes' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Fire on the next frame so the success view has mounted.
        requestAnimationFrame(fireCelebration)
      }
    } catch (err: unknown) {
      // Log to console in dev — swap for a real logger in production.
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error('RSVP insert failed', err)
      }
      setStatus('error')
    }
  }

  if (status === 'success') {
    const yes = attending === 'yes'
    return (
      <section id="rsvp" className="mx-auto max-w-xl px-6 py-16">
        <SectionTitle>{t('rsvp.title')}</SectionTitle>
        <div className="mt-12 text-center">
          <p
            className="italic"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-invitation)' }}
          >
            {yes ? t('rsvp.thanks') : t('rsvp.thanksDecline')}
          </p>
          <p
            className="mt-3 italic"
            style={{ color: 'var(--color-ink-soft)', fontSize: 'var(--fs-body)' }}
          >
            {yes ? t('rsvp.thanksSub') : t('rsvp.thanksDeclineSub')}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="mx-auto max-w-xl px-6 py-16">
      <SectionTitle>{t('rsvp.title')}</SectionTitle>

      <CountdownBadge days={days} />

      <form onSubmit={handleSubmit} className="mt-16 flex flex-col gap-8">
        <Field label={t('rsvp.fields.name')} name="guest_name" required />
        <Field label={t('rsvp.fields.email')} name="email" type="email" />

        <AttendingChoice value={attending} onChange={setAttending} />

        {attending === 'yes' && (
          <>
            <GuestCounters
              adults={adults}
              childCount={children}
              onAdults={setAdults}
              onChildren={setChildren}
            />
            <Field label={t('rsvp.fields.dietary')} name="dietary_notes" multiline />
          </>
        )}

        <Field
          label={t('rsvp.fields.message')}
          name="message"
          multiline
          placeholder={t('rsvp.fields.messagePlaceholder')}
        />

        <button
          type="submit"
          className="mt-4 inline-flex items-center justify-center gap-3 self-center px-10 py-4 transition"
          style={{
            backgroundColor:
              attending === null || status === 'submitting'
                ? 'var(--color-ink-faint)'
                : 'var(--color-gold)',
            color: 'var(--color-paper)',
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--fs-body)',
            letterSpacing: '0.05em',
            border: 'none',
            cursor:
              attending === null || status === 'submitting' ? 'not-allowed' : 'pointer',
          }}
          disabled={attending === null || status === 'submitting'}
        >
          <PaperPlaneIcon size={18} color="var(--color-paper)" />
          {status === 'submitting' ? t('rsvp.sending') : t('rsvp.submit')}
        </button>

        {status === 'error' && (
          <p
            className="text-center"
            style={{ color: 'var(--color-ink)', fontSize: 'var(--fs-body)' }}
            role="alert"
          >
            {t('rsvp.error')}
          </p>
        )}
      </form>
    </section>
  )
}

// CountdownBadge — the visual anchor between the section title and the form.
// Big gold number + italic "jours" on one baseline, flanked by two hairlines,
// then the deadline date in small caps. Reads as "a date, not a status line."
interface CountdownBadgeProps {
  days: number
}

function CountdownBadge({ days }: CountdownBadgeProps) {
  const { t } = useTranslation()

  // Past the deadline: show a gentler line in the same slot.
  if (days <= 0) {
    return (
      <p
        className="mt-8 text-center uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink-soft)',
        }}
      >
        {t('rsvp.deadlineLabel')}
      </p>
    )
  }

  return (
    <div className="mt-10 flex flex-col items-center">
      <div
        aria-hidden
        style={{
          width: 80,
          height: 1,
          backgroundColor: 'var(--color-gold)',
          opacity: 0.5,
        }}
      />

      <div className="my-6 flex items-baseline gap-3">
        <span
          aria-label={`${days} jours`}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.5rem, 10vw, 6rem)',
            fontWeight: 500,
            color: 'var(--color-gold)',
            lineHeight: 0.95,
            letterSpacing: '-0.025em',
          }}
        >
          {days}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--fs-invitation)',
            fontStyle: 'italic',
            color: 'var(--color-ink)',
          }}
        >
          {t('rsvp.unitDays')}
        </span>
      </div>

      <div
        aria-hidden
        style={{
          width: 80,
          height: 1,
          backgroundColor: 'var(--color-gold)',
          opacity: 0.5,
        }}
      />

      <p
        className="mt-5 uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink-soft)',
        }}
      >
        {t('rsvp.deadlineLabel')}
      </p>
    </div>
  )
}

interface FieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  multiline?: boolean
  placeholder?: string
}

function Field({
  label,
  name,
  type = 'text',
  required,
  multiline,
  placeholder,
}: FieldProps) {
  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: 'var(--fs-body)',
    color: 'var(--color-ink)',
    // Faint tint makes the tap-target visible on mobile without stealing
    // attention from the surrounding typography.
    backgroundColor: 'rgba(61, 46, 53, 0.025)',
    border: 'none',
    borderBottom: `1px solid var(--color-ink-faint)`,
    padding: '0.75rem 0.85rem',
    width: '100%',
    outline: 'none',
  }

  return (
    <label className="flex flex-col gap-1">
      <span
        className="uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink-soft)',
        }}
      >
        {label}
        {required ? ' *' : ''}
      </span>
      {multiline ? (
        <textarea
          name={name}
          rows={3}
          required={required}
          placeholder={placeholder}
          style={inputStyle}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          style={inputStyle}
        />
      )}
    </label>
  )
}

interface AttendingChoiceProps {
  value: Attending
  onChange: (v: Attending) => void
}

function AttendingChoice({ value, onChange }: AttendingChoiceProps) {
  const { t } = useTranslation()

  const buttonStyle = (selected: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-serif)',
    fontSize: 'var(--fs-invitation)',
    fontStyle: 'italic',
    padding: '1.5rem 1rem',
    border: `1px solid ${selected ? 'var(--color-ink)' : 'var(--color-ink-faint)'}`,
    backgroundColor: selected ? 'var(--color-blush)' : 'transparent',
    color: 'var(--color-ink)',
    cursor: 'pointer',
    transition: 'all 200ms var(--ease-quart-out)',
  })

  return (
    <fieldset className="flex flex-col gap-3">
      <legend
        className="uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink-soft)',
          marginBottom: '0.75rem',
        }}
      >
        {t('rsvp.attending.question')}
      </legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => onChange('yes')} style={buttonStyle(value === 'yes')}>
          {t('rsvp.attending.yes')}
        </button>
        <button type="button" onClick={() => onChange('no')} style={buttonStyle(value === 'no')}>
          {t('rsvp.attending.no')}
        </button>
      </div>
    </fieldset>
  )
}

interface GuestCountersProps {
  adults: number
  childCount: number
  onAdults: (n: number) => void
  onChildren: (n: number) => void
}

function GuestCounters({ adults, childCount, onAdults, onChildren }: GuestCountersProps) {
  const { t } = useTranslation()
  return (
    <fieldset className="flex flex-col gap-5">
      <legend
        className="uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink-soft)',
          marginBottom: '0.5rem',
        }}
      >
        {t('rsvp.fields.guests')}
      </legend>
      <Stepper
        label={t('rsvp.fields.adults')}
        value={adults}
        onChange={onAdults}
        min={1}
        hint={t('rsvp.fields.guestsHint')}
      />
      <Stepper
        label={t('rsvp.fields.children')}
        value={childCount}
        onChange={onChildren}
        min={0}
      />
    </fieldset>
  )
}

interface StepperProps {
  label: string
  value: number
  onChange: (n: number) => void
  min: number
  hint?: string
}

function Stepper({ label, value, onChange, min, hint }: StepperProps) {
  const canDecrement = value > min
  const buttonStyle = (disabled: boolean): React.CSSProperties => ({
    width: 40,
    height: 40,
    border: '1px solid var(--color-ink-faint)',
    backgroundColor: 'transparent',
    color: disabled ? 'var(--color-ink-faint)' : 'var(--color-ink)',
    fontSize: '1.25rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  })

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-body)' }}>{label}</div>
        {hint && (
          <div
            className="mt-0.5"
            style={{
              fontSize: 'var(--fs-meta)',
              color: 'var(--color-ink-soft)',
              letterSpacing: '0.05em',
            }}
          >
            {hint}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Diminuer ${label}`}
          onClick={() => canDecrement && onChange(value - 1)}
          style={buttonStyle(!canDecrement)}
          disabled={!canDecrement}
        >
          −
        </button>
        <div
          aria-live="polite"
          className="w-10 text-center"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--fs-body-lg)',
            color: 'var(--color-ink)',
          }}
        >
          {value}
        </div>
        <button
          type="button"
          aria-label={`Augmenter ${label}`}
          onClick={() => onChange(value + 1)}
          style={buttonStyle(false)}
        >
          +
        </button>
      </div>
    </div>
  )
}
