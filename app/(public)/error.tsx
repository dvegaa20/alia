'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react'

export default function PublicError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md rounded-[20px] border border-border bg-surface p-8">
        <div className="mx-auto size-14 rounded-2xl bg-urgency-coral/10 border border-urgency-coral/25 flex items-center justify-center">
          <AlertTriangle className="size-7 text-urgency-coral" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <h1 className="font-sans text-2xl font-semibold tracking-tight text-foreground">
            Algo salió mal
          </h1>
          <p className="font-sans text-foreground-secondary text-sm">
            No pudimos cargar esta página. Es posible que sea un error temporal.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => reset()}
            variant="default"
            className="rounded-full px-5 py-2.5 h-auto gap-2 bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            <RotateCcw className="size-4" strokeWidth={1.5} />
            Intentar de nuevo
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-5 py-2.5 h-auto gap-2 border-primary text-primary hover:bg-primary/5"
            asChild
          >
            <Link href="/">
              Ir al inicio
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
