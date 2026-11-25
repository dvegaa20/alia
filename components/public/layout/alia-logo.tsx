import Image from 'next/image'
import { cn } from '@/lib/utils'

interface AliaLogoProps {
  variant?: 'auto' | 'light' | 'dark'
  hasLogoLight?: boolean
  hasLogoDark?: boolean
  className?: string
}

export function AliaLogo({
  variant = 'dark',
  hasLogoLight = false,
  hasLogoDark = false,
  className,
}: AliaLogoProps) {
  if (variant === 'light' && hasLogoLight) {
    return (
      <Image
        src="/logo-light.svg"
        alt="Alia"
        width={96}
        height={32}
        className={cn('h-7 w-auto object-contain', className)}
        priority
      />
    )
  }

  if ((variant === 'dark' || variant === 'auto') && hasLogoDark) {
    return (
      <Image
        src="/logo-dark.svg"
        alt="Alia"
        width={96}
        height={32}
        className={cn('h-7 w-auto object-contain', className)}
        priority
      />
    )
  }

  const isLight = variant === 'light'

  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-1 font-sans text-[22px] font-medium tracking-[-0.035em] leading-none',
        isLight ? 'text-merino' : 'text-venice-blue',
        className
      )}
    >
      <span>alia</span>
      <span
        className={cn('size-1.5 rounded-full', isLight ? 'bg-rock-blue' : 'bg-venice-blue')}
        aria-hidden="true"
      />
    </span>
  )
}
