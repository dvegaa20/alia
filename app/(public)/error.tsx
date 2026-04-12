'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react'

export default function PublicError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Algo salió mal</h1>
          <p className="text-muted-foreground text-sm">
            No pudimos cargar esta página. Es posible que sea un error temporal.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => reset()} variant="default" className="rounded-xl gap-2">
            <RotateCcw className="w-4 h-4" />
            Intentar de nuevo
          </Button>
          <Button variant="outline" className="rounded-xl gap-2" asChild>
            <Link href="/">
              Ir al inicio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
