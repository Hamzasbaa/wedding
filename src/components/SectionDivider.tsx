// Shared divider between sections.
// A small olive-sprig mark flanked by hairlines — the "ornamental warmth" from
// the references, without the cherub/baroque heaviness.
import { SprigIcon } from '@/components/Icons'

export function SectionDivider() {
  return (
    <div className="mx-auto my-20 flex items-center justify-center" aria-hidden>
      <SprigIcon size={100} color="var(--color-gold)" />
    </div>
  )
}
