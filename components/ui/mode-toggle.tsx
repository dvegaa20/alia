'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ModeToggle({
  size = 'icon',
}: {
  size?: React.ComponentProps<typeof Button>['size']
}) {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    document.startViewTransition(() => {
      setTheme(newTheme)
    })
  }

  return (
    <Button
      variant="outline"
      size={size}
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      className="rounded-full size-9 border-border bg-surface hover:bg-surface-subtle hover:border-rock-blue text-foreground"
    >
      <Sun
        className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        strokeWidth={1.5}
      />
      <Moon
        className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        strokeWidth={1.5}
      />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )
}
