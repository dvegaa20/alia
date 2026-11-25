import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SuggestOrgDialog } from '@/components/public/suggest/suggest-org-dialog'

export function FooterCTA() {
  return (
    <div className="border-b border-merino/15 py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-rock-blue">
          Actúa hoy
        </p>
        <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] tracking-[-0.025em] text-white dark:text-merino">
          ¿Listo para hacer una verdadera diferencia?
        </h2>
        <p className="font-sans text-base sm:text-lg text-merino/80 max-w-2xl mx-auto leading-[1.6]">
          Explora nuestro directorio verificado de organizaciones sociales y encuentra la causa
          perfecta para apoyar con tu tiempo o tus recursos.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button
            asChild
            className="rounded-full bg-merino text-deep-harbor hover:bg-white px-6 py-3 h-auto text-[15px] font-medium border-none"
          >
            <Link href="/directory">
              Explorar causas
              <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
            </Link>
          </Button>
          <SuggestOrgDialog>
            <Button
              type="button"
              variant="outline"
              className="rounded-full border-merino/50 bg-transparent text-merino hover:bg-white/10 hover:text-white hover:border-merino px-6 py-3 h-auto text-[15px] font-medium"
            >
              Sugerir ONG
            </Button>
          </SuggestOrgDialog>
        </div>
      </div>
    </div>
  )
}
