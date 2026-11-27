'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function UnauthorizedPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(7)

  useEffect(() => {
    if (countdown <= 0) {
      router.push('/')
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="text-center space-y-6 max-w-md rounded-[20px] border border-border bg-surface p-8 sm:p-10">
        <div className="space-y-2">
          <p className=" text-xs uppercase tracking-[0.04em] text-urgency-coral font-medium">
            Acceso restringido
          </p>
          <h1 className="font-sans text-3xl font-medium tracking-[-0.02em] text-foreground">
            Acceso denegado
          </h1>
          <p className="font-sans text-sm text-foreground-secondary leading-relaxed">
            Tu cuenta no tiene permisos para acceder al panel de administración. Si crees que esto
            es un error, contacta al administrador.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button
            className="rounded-full px-6 py-2.5 h-auto bg-primary hover:bg-primary-hover text-primary-foreground font-sans text-sm font-medium group"
            asChild
          >
            <Link href="/">
              <span className="flex items-center gap-2">
                Volver al inicio
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </span>
            </Link>
          </Button>

          <Button
            variant="outline"
            className="rounded-full border-primary text-primary hover:bg-primary/5 px-6 py-2.5 h-auto font-sans text-sm font-medium"
            asChild
          >
            <Link href="/">
              Inicio (<span className=" tabular-nums">{countdown}s</span>)
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
