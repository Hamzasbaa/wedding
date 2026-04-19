// "Votre réponse" — RSVP form UI. Inputs styled as letters (underline-only,
// no border-box), two large radio options "Avec joie / Avec regret".
// Phase 2f: styling + local state. Phase 3 wires submission to Supabase.
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'

type Attending = 'yes' | 'no' | null

export function Rsvp() {
  const { t } = useTranslation()
  const [attending, setAttending] = useState<Attending>(null)
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
            <Field label={t('rsvp.fields.plusOne')} name="plus_one_name" />
            <Field label={t('rsvp.fields.dietary')} name="dietary_notes" />
          </>
        )}

        <Field label={t('rsvp.fields.message')} name="message" multiline />

        <button
          type="submit"
          className="mt-4 self-center px-10 py-3 transition"
          style={{
            backgroundColor: 'var(--color-ink)',
            color: 'var(--color-paper)',
            fontSize: 'var(--fs-body)',
            letterSpacing: '0.05em',
          }}
          disabled={attending === null}
        >
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
