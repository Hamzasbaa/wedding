// "Cadeaux" — replaces the old Gifts section.
// Differences from the old Gifts:
//   - Gated behind a click so the IBANs don't shout on first scroll.
//   - Accounts labeled "En France" / "Au Maroc" instead of holder name —
//     useful to guests, not ego-coded.
//   - No "BANQUE —" prefix (it was a mistranslation; banque != account holder).
//   - Slot position: after RSVP, not before.
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'
import { Reveal } from '@/components/Reveal'

interface Account {
  label: string
  holder: string
  iban: string
  bic: string
}

export function Cadeaux() {
  const { t } = useTranslation()
  const accounts = t('cadeaux.accounts', { returnObjects: true }) as Account[]
  const [open, setOpen] = useState(false)

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <SectionTitle>{t('cadeaux.title')}</SectionTitle>

      <Reveal delay={100}>
      <p
        className="mx-auto mt-6 max-w-xl text-center italic"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--fs-invitation)',
          lineHeight: 1.5,
          color: 'var(--color-ink-soft)',
        }}
      >
        {t('cadeaux.intro')}
      </p>
      </Reveal>

      <Reveal delay={250} className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="uppercase transition"
          style={{
            fontSize: 'var(--fs-meta)',
            letterSpacing: 'var(--tracking-meta)',
            color: 'var(--color-ink)',
            padding: '0.7rem 1.4rem',
            border: '1px solid var(--color-ink-faint)',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          {open ? t('cadeaux.toggleClose') : t('cadeaux.toggleOpen')}
        </button>
      </Reveal>

      {open && (
        <div className="mt-8 flex flex-col gap-6">
          {accounts.map((account) => (
            <AccountCard
              key={account.label}
              account={account}
              ibanLabel={t('cadeaux.ibanLabel')}
              bicLabel={t('cadeaux.bicLabel')}
              copyLabel={t('cadeaux.copy')}
              copiedLabel={t('cadeaux.copied')}
            />
          ))}
        </div>
      )}
    </section>
  )
}

interface AccountCardProps {
  account: Account
  ibanLabel: string
  bicLabel: string
  copyLabel: string
  copiedLabel: string
}

function AccountCard({
  account,
  ibanLabel,
  bicLabel,
  copyLabel,
  copiedLabel,
}: AccountCardProps) {
  const [copied, setCopied] = useState<'iban' | 'bic' | null>(null)

  async function copy(value: string, which: 'iban' | 'bic') {
    const stripped = value.replace(/\s+/g, '')
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(stripped)
      } else {
        // Fallback for non-secure contexts (old Safari, http://).
        const ta = document.createElement('textarea')
        ta.value = stripped
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(which)
      setTimeout(() => setCopied(null), 1800)
    } catch (err: unknown) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn('Clipboard copy failed', err)
      }
    }
  }

  return (
    <div
      className="px-6 py-5"
      style={{
        border: '1px solid var(--color-ink-faint)',
        backgroundColor: 'var(--color-paper)',
      }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <div
          className="uppercase"
          style={{
            fontSize: 'var(--fs-meta)',
            letterSpacing: 'var(--tracking-meta)',
            color: 'var(--color-gold)',
            fontWeight: 500,
          }}
        >
          {account.label}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--fs-body)',
            fontStyle: 'italic',
            color: 'var(--color-ink-soft)',
          }}
        >
          {account.holder}
        </div>
      </div>

      <Row
        label={ibanLabel}
        value={account.iban}
        copyLabel={copyLabel}
        copiedLabel={copiedLabel}
        copied={copied === 'iban'}
        onCopy={() => copy(account.iban, 'iban')}
      />
      <Row
        label={bicLabel}
        value={account.bic}
        copyLabel={copyLabel}
        copiedLabel={copiedLabel}
        copied={copied === 'bic'}
        onCopy={() => copy(account.bic, 'bic')}
      />
    </div>
  )
}

interface RowProps {
  label: string
  value: string
  copyLabel: string
  copiedLabel: string
  copied: boolean
  onCopy: () => void
}

function Row({ label, value, copyLabel, copiedLabel, copied, onCopy }: RowProps) {
  return (
    <div className="mt-4 flex items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <div
          className="uppercase"
          style={{
            fontSize: 'var(--fs-meta)',
            letterSpacing: 'var(--tracking-meta)',
            color: 'var(--color-ink-soft)',
          }}
        >
          {label}
        </div>
        <div
          className="mt-1 break-all"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--fs-body)',
            color: 'var(--color-ink)',
            letterSpacing: '0.04em',
          }}
        >
          {value}
        </div>
      </div>
      <button
        type="button"
        onClick={onCopy}
        className="uppercase transition"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: copied ? 'var(--color-gold)' : 'var(--color-ink-soft)',
          padding: '0.35rem 0.75rem',
          border: '1px solid var(--color-ink-faint)',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  )
}
