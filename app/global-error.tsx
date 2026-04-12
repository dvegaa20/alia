'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans">
        <div className="text-center space-y-6 max-w-md px-6">
          <h1 className="text-4xl font-bold tracking-tight">Error inesperado</h1>
          <p className="text-neutral-500">Ocurrió un error crítico cargando la aplicación. Por favor intenta de nuevo.</p>
          <button
            onClick={() => reset()}
            className="px-6 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold hover:opacity-90 transition"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  )
}
