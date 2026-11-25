'use client'

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex items-center justify-center bg-[#F5EEDD] text-[#111827] font-sans">
        <div className="text-center space-y-6 max-w-md px-8 py-10 rounded-[20px] border border-[#E3DAC6] bg-white">
          <h1 className="text-3xl font-medium tracking-tight">Error inesperado</h1>
          <p className="text-[#374151] text-sm">
            Ocurrió un error crítico cargando la aplicación. Por favor intenta de nuevo.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-[#16587B] text-white text-sm font-medium hover:bg-[#0E3A52] transition cursor-pointer"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  )
}
