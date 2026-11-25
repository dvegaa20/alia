import Image from 'next/image'
import { cn } from '@/lib/utils'

interface AliaLogoProps {
  variant?: 'auto' | 'light' | 'dark'
  hasLogoLight?: boolean
  hasLogoDark?: boolean
  className?: string
}

export function AliaLogo({
  variant = 'auto',
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

  if (variant === 'dark' && hasLogoDark) {
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

  if (variant === 'auto' && hasLogoLight && hasLogoDark) {
    return (
      <span className={cn('inline-flex items-center', className)}>
        <Image
          src="/logo-dark.svg"
          alt="Alia"
          width={96}
          height={32}
          className="h-7 w-auto object-contain dark:hidden"
          priority
        />
        <Image
          src="/logo-light.svg"
          alt="Alia"
          width={96}
          height={32}
          className="hidden h-7 w-auto object-contain dark:block"
          priority
        />
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-sans text-xl font-semibold tracking-[-0.03em]',
        variant === 'light'
          ? 'text-merino'
          : variant === 'dark'
            ? 'text-venice-blue'
            : 'text-venice-blue dark:text-merino',
        className
      )}
    >
      <span>alia</span>
      <span
        className={cn(
          'size-1.5 rounded-full',
          variant === 'light' ? 'bg-rock-blue' : 'bg-venice-blue dark:bg-rock-blue'
        )}
        aria-hidden="true"
      />
    </span>
  )
}
