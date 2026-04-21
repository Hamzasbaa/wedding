// Shared divider between sections.
// A small olive-sprig mark flanked by hairlines — the "ornamental warmth" from
// the references, without the cherub/baroque heaviness.
//
// Margins tightened to my-8 (mobile) / my-10 (desktop) — the sections
// already carry their own py padding, so a large divider margin was
// creating oversized gaps (my-20 + py-16 × 2 = 288px between content).
import { SprigIcon } from '@/components/Icons'

export function SectionDivider() {
  return (
    <div className="mx-auto my-8 flex items-center justify-center md:my-10" aria-hidden>
      <SprigIcon size={100} color="var(--color-gold)" />
    </div>
  )
}
