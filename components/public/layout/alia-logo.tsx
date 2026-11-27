import { cn } from '@/lib/utils'

interface AliaLogoProps {
  variant?: 'auto' | 'light' | 'dark'
  hasLogoLight?: boolean
  hasLogoDark?: boolean
  className?: string
}

export function AliaLogo({ className }: AliaLogoProps) {
  const src = '/images/Alia.svg'

  return (
    <img
      src={src}
      alt="Alia"
      width={1000}
      height={500}
      className={cn('h-11 w-auto object-contain select-none', className)}
    />
  )
}
