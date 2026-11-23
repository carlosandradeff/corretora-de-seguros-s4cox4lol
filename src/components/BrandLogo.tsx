import { cn } from '@/lib/utils'

type BrandLogoProps = {
  inverse?: boolean
  compact?: boolean
  className?: string
}

export function ShieldMark({
  className,
  inverse = false,
}: {
  className?: string
  inverse?: boolean
}) {
  const color = inverse ? '#FFFFFF' : '#1565D8'

  return (
    <svg
      viewBox="0 0 72 72"
      role="img"
      aria-label="Emblema da Stop Seguros"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 5H50L67 22V50L50 67H22L5 50V22L22 5Z"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M49.5 21H29.5C23.7 21 20 24.4 20 29.2C20 33 22.1 35.6 26.3 38L45.7 49.2"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M22 43.5V48C22 52.8 27 56.5 31.2 59L36 62L40.8 59C45 56.4 50 52.8 50 48V39L36 31"
        stroke={color}
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BrandLogo({ inverse = false, compact = false, className }: BrandLogoProps) {
  const main = inverse ? 'text-white' : 'text-[#0A2E6E]'
  const sub = inverse ? 'text-blue-100' : 'text-[#1565D8]'

  return (
    <div className={cn('inline-flex items-center gap-2.5', className)} aria-label="Stop Seguros">
      <ShieldMark inverse={inverse} className="h-12 w-12 shrink-0" />
      {!compact && (
        <div className="leading-none">
          <span className={cn('block text-[18px] font-extrabold tracking-[0.08em]', main)}>
            STOP SEGUROS
          </span>
          <span className={cn('mt-1.5 block text-[7px] font-bold tracking-[0.31em]', sub)}>
            PROTEÇÃO E TRANQUILIDADE
          </span>
        </div>
      )}
    </div>
  )
}
