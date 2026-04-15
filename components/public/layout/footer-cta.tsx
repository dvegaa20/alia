import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function FooterCTA() {
  return (
    <div className="relative pt-24 pb-56 px-8">
      {/* Radial gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
      />

      <div className="relative z-10 max-w-400 mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold  font-headline leading-tight tracking-tight">
          ¿Listo para hacer una verdadera diferencia?
        </h2>
        <p className="text-base-400 text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed">
          Explora nuestro directorio verificado de organizaciones sociales y encuentra el proyecto
          perfecto para apoyar con tu tiempo o tus recursos.
        </p>
        <div className="pt-2">
          <Button
            asChild
            variant="secondary"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 h-auto text-base font-semibold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-500 hover:scale-[1.04] active:scale-95 mb-1"
          >
            <Link href="/directory">
              Explorar Causas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
