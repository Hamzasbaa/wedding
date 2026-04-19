// "Cadeaux" — gifts/honeymoon section.
// Soft copy up top, then one card per bank account with IBAN + BIC.
// Copy-to-clipboard on each number so nobody has to hand-transcribe.
// IBANs are placeholders; swap before sending the invitation out.
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/SectionTitle'

interface Account {
  bank: string
  iban: string
  bic: string
}

export function Gifts() {
  const { t, i18n } = useTranslation()
  const accounts = t('gifts.accounts', { returnObjects: true }) as Account[]
  const font = i18n.language === 'ar' ? 'var(--font-arabic-display)' : 'var(--font-serif)'

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <SectionTitle>{t('gifts.title')}</SectionTitle>

      <p
        className="mx-auto mt-6 max-w-xl text-center italic"
        style={{
          fontFamily: font,
          fontSize: 'var(--fs-invitation)',
          lineHeight: 1.5,
          color: 'var(--color-ink-soft)',
        }}
      >
        {t('gifts.intro')}
      </p>

      <div className="mt-12 flex flex-col gap-6">
        {accounts.map((account) => (
          <AccountCard
            key={account.bank}
            account={account}
            ibanLabel={t('gifts.ibanLabel')}
            bicLabel={t('gifts.bicLabel')}
            copyLabel={t('gifts.copy')}
            copiedLabel={t('gifts.copied')}
          />
        ))}
      </div>
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

function AccountCard({ account, ibanLabel, bicLabel, copyLabel, copiedLabel }: AccountCardProps) {
  const [copied, setCopied] = useState<'iban' | 'bic' | null>(null)

  async function copy(value: string, which: 'iban' | 'bic') {
    try {
      await navigator.clipboard.writeText(value.replace(/\s+/g, ''))
      setCopied(which)
      setTimeout(() => setCopied(null), 1800)
    } catch {
      // Clipboard API unavailable (e.g. non-secure context) — silently ignore.
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
      <div
        className="uppercase"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-meta)',
          color: 'var(--color-ink)',
          fontWeight: 500,
        }}
      >
        {account.bank}
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
