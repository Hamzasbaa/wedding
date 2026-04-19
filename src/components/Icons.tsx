// Line-drawn icon set for the schedule timeline.
// Hairline strokes (1.5) to match the invitation's overall delicacy.
// No airplane: HS explicitly wanted to avoid the flight metaphor.

interface IconProps {
  size?: number
  color?: string
}

function baseProps({ size = 28, color = 'currentColor' }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
}

export function RingsIcon(props: IconProps) {
  // Two interlocking rings — wedding vows.
  return (
    <svg {...baseProps(props)} aria-hidden>
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="14" r="5" />
      <path d="M9 4 L12 7 L15 4" />
    </svg>
  )
}

export function CocktailIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)} aria-hidden>
      <path d="M5 5 L19 5 L12 14 Z" />
      <path d="M12 14 L12 20" />
      <path d="M8 20 L16 20" />
      <circle cx="16" cy="7" r="0.8" fill="currentColor" />
    </svg>
  )
}

export function PlateIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)} aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="5.5" />
      <path d="M6 6 L4 4" />
      <path d="M18 6 L20 4" />
    </svg>
  )
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)} aria-hidden>
      <path d="M12 20 C 6 15, 3 12, 3 8 A 4 4 0 0 1 12 6 A 4 4 0 0 1 21 8 C 21 12, 18 15, 12 20 Z" />
    </svg>
  )
}

export function MusicIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)} aria-hidden>
      <path d="M9 18 L9 7 L19 5 L19 16" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="16" r="2" />
    </svg>
  )
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)} aria-hidden>
      <path d="M12 2 C 8 2, 5 5, 5 9 C 5 14, 12 22, 12 22 C 12 22, 19 14, 19 9 C 19 5, 16 2, 12 2 Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

export function PaperPlaneIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)} aria-hidden>
      <path d="M22 2 L11 13" />
      <path d="M22 2 L15 22 L11 13 L2 9 Z" />
    </svg>
  )
}

export function SprigIcon({ size = 80, color = 'currentColor' }: IconProps) {
  // Small botanical divider — olive sprig feel, Moroccan-coherent, not cherub-ornate.
  return (
    <svg
      width={size}
      height={size / 4}
      viewBox="0 0 80 20"
      fill="none"
      stroke={color}
      strokeWidth={1}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M0 10 L30 10" />
      <path d="M50 10 L80 10" />
      <path d="M35 10 Q 40 4, 45 10 Q 40 16, 35 10 Z" />
      <path d="M40 5 L40 2" />
      <path d="M40 15 L40 18" />
    </svg>
  )
}

export type IconName = 'rings' | 'cocktail' | 'plate' | 'heart' | 'music' | 'pin'

export function ScheduleIcon({ name, size }: { name: IconName; size?: number }) {
  switch (name) {
    case 'rings':
      return <RingsIcon size={size} />
    case 'cocktail':
      return <CocktailIcon size={size} />
    case 'plate':
      return <PlateIcon size={size} />
    case 'heart':
      return <HeartIcon size={size} />
    case 'music':
      return <MusicIcon size={size} />
    case 'pin':
      return <PinIcon size={size} />
  }
}
