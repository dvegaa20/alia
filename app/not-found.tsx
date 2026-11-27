'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Compass, MapPinOff, ArrowRight } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

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
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <main className="grow flex items-center justify-center px-4 md:px-8 py-10">
        <div className="max-w-2xl w-full flex flex-col items-center text-center">
          {/* Illustration Area */}
          <div className="relative mb-8">
            <div className="relative flex flex-col items-center">
              <div className="size-40 md:size-44 bg-surface rounded-[20px] flex items-center justify-center border border-border overflow-hidden">
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <Compass className="text-primary size-16 md:size-20" strokeWidth={1.25} />
                  <div className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-primary" />
                    <span className="size-2 rounded-full bg-primary/30" />
                    <span className="size-2 rounded-full bg-primary/30" />
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-1.5  text-xs text-foreground-muted">
                <MapPinOff className="size-3.5 text-primary" strokeWidth={1.5} />
                <span>Ruta no encontrada</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-xl">
            <span className=" text-primary font-medium tracking-[0.04em] text-xs uppercase mb-3 block">
              Error 404
            </span>
            <h1 className="font-sans text-3xl md:text-4xl font-medium text-foreground tracking-[-0.025em] mb-4">
              Parece que te perdiste buscando buenas causas.
            </h1>
            <p className="font-sans text-sm md:text-base text-foreground-secondary leading-relaxed mb-8">
              No podemos encontrar la página u organización que buscas. Es posible que el enlace sea
              incorrecto o la información haya sido movida. Hay muchas causas esperando tu apoyo.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                className="rounded-full px-6 py-3 h-auto bg-primary hover:bg-primary-hover text-primary-foreground font-sans text-sm font-medium group"
                asChild
              >
                <Link href="/directory">
                  <span className="flex items-center gap-2">
                    Volver al directorio
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </span>
                </Link>
              </Button>

              <Button
                variant="outline"
                className="rounded-full border-primary text-primary hover:bg-primary/5 px-6 py-3 h-auto font-sans text-sm font-medium"
                asChild
              >
                <Link href="/">
                  Ir al inicio (<span className=" tabular-nums">{countdown}s</span>)
                </Link>
              </Button>
            </div>
          </div>

          {/* Suggestion Content */}
          <div className="mt-10 pt-6 border-t border-border w-full max-w-md">
            <p className=" text-xs text-foreground-muted mb-3">¿Buscabas algo específico?</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Medio Ambiente', 'Educación', 'Salud', 'Derechos Humanos'].map((cat) => (
                <Badge
                  key={cat}
                  variant="outline"
                  className="bg-surface border-border text-foreground-secondary px-3 py-1 text-xs rounded-full font-medium"
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
