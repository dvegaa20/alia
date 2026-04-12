'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Error del servidor</h1>
          <p className="text-muted-foreground text-sm">
            No se pudo cargar el panel. Verifica tu conexión o intenta de nuevo.
          </p>
        </div>
        <Button onClick={() => reset()} variant="default" className="rounded-xl gap-2">
          <RotateCcw className="w-4 h-4" />
          Reintentar
        </Button>
      </div>
    </div>
  )
}
