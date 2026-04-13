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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md px-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Acceso Denegado</h1>
          <p className="text-muted-foreground">
            Tu cuenta no tiene permisos para acceder al panel de administración. Si crees que esto
            es un error, contacta al administrador.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button
            className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group px-6 bg-linear-to-r from-primary to-primary-300 hover:from-primary/90 hover:to-primary-300/90 text-primary-foreground"
            asChild
          >
            <Link href="/">
              <span className="relative z-10 flex items-center gap-2">
                Volver al inicio
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Button>

          <Button
            variant="outline"
            className="rounded-xl border-primary/20 text-primary-900 dark:text-primary-200 hover:bg-muted hover:text-primary-900 dark:hover:text-primary-200 transition-colors duration-300 px-6"
            asChild
          >
            <Link href="/">Ir al Inicio ({countdown}s)</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
