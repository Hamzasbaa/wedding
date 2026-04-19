// "Votre réponse" — RSVP form.
// Simple variant: one shared guest counter (adults + children +/- steppers),
// one shared name + dietary + optional message.
// Plus a gold-filled submit button with a paper-plane icon.
// Phase 2f: styling + local state. Phase 3 wires submission to Supabase.
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'
import { PaperPlaneIcon } from '@/components/Icons'

type Attending = 'yes' | 'no' | null

export function Rsvp() {
  const { t } = useTranslation()
  const [attending, setAttending] = useState<Attending>(null)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Phase 3 wires this to Supabase. For now, local confirmation.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="mx-auto max-w-xl px-6 py-16">
        <SectionTitle>{t('rsvp.title')}</SectionTitle>
        <p
          className="mt-12 text-center italic"
          style={{ fontSize: 'var(--fs-invitation)' }}
        >
          {t('rsvp.thanks')}
        </p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-16">
      <SectionTitle>{t('rsvp.title')}</SectionTitle>

      <p
        className="mt-6 text-center italic"
        style={{ color: 'var(--color-ink-soft)', fontSize: 'var(--fs-body)' }}
      >
        {t('rsvp.subtitle')}
      </p>

      <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
        <Field label={t('rsvp.fields.name')} name="guest_name" required />
        <Field label={t('rsvp.fields.email')} name="email" type="email" />

        <AttendingChoice value={attending} onChange={setAttending} />

        {attending === 'yes' && (
          <>
            <GuestCounters
              adults={adults}
              children={children}
              onAdults={setAdults}
              onChildren={setChildren}
            />
            <Field label={t('rsvp.fields.dietary')} name="dietary_notes" multiline />
          </>
        )}

        <Field label={t('rsvp.fields.message')} name="message" multiline />

        <button
          type="submit"
          className="mt-4 inline-flex items-center justify-center gap-3 self-center px-10 py-4 transition"
          style={{
            backgroundColor: attending === null ? 'var(--color-ink-faint)' : 'var(--color-gold)',
            color: 'var(--color-paper)',
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--fs-body)',
            letterSpacing: '0.05em',
            border: 'none',
            cursor: attending === null ? 'not-allowed' : 'pointer',
          }}
          disabled={attending === null}
        >
          <PaperPlaneIcon size={18} color="var(--color-paper)" />
          {t('rsvp.submit')}
        </button>
      </form>
    </section>
  )
}

interface FieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  multiline?: boolean
}

function Field({ label, name, type = 'text', required, multiline }: FieldProps) {
  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: 'var(--fs-body)',
    color: 'var(--color-ink)',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid var(--color-ink-faint)`,
    padding: '0.5rem 0',
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
        <textarea name={name} rows={3} required={required} style={inputStyle} />
      ) : (
        <input type={type} name={name} required={required} style={inputStyle} />
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
  children: number
  onAdults: (n: number) => void
  onChildren: (n: number) => void
}

function GuestCounters({ adults, children, onAdults, onChildren }: GuestCountersProps) {
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
        value={children}
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
          aria-label={`Decrease ${label}`}
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
          aria-label={`Increase ${label}`}
          onClick={() => onChange(value + 1)}
          style={buttonStyle(false)}
        >
          +
        </button>
      </div>
    </div>
  )
}
