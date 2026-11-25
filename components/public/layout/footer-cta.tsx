import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SuggestOrgDialog } from '@/components/public/suggest/suggest-org-dialog'

export function FooterCTA() {
  return (
    <div className="border-b border-[#84B3CE]/15 py-20 lg:py-24 px-6 md:px-10 lg:px-14">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#84B3CE]">
          Actúa hoy
        </p>
        <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[52px] leading-[1.05] tracking-normal text-white">
          ¿Listo para hacer una verdadera{' '}
          <span className="font-serif italic font-normal text-[#F5EEDD] text-[1.06em]">
            diferencia
          </span>
          ?
        </h2>
        <p className="font-sans text-base sm:text-lg text-[#F5EEDD]/80 max-w-2xl mx-auto leading-[1.6]">
          Explora nuestro directorio verificado de organizaciones sociales y encuentra la causa
          perfecta para apoyar con tu tiempo o tus recursos.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            className="rounded-[4px] bg-[#84B3CE] text-[#0C354C] hover:bg-[#9AC3DA] px-6 py-3 h-auto text-[16px] font-medium border border-[#84B3CE] shadow-none transition-colors"
          >
            <Link href="/directory">
              Explorar causas
              <ArrowRight className="ml-2 size-4" strokeWidth={1.75} />
            </Link>
          </Button>
          <SuggestOrgDialog>
            <Button
              type="button"
              variant="outline"
              className="rounded-[4px] border-[#84B3CE] bg-transparent text-[#84B3CE] hover:bg-[#84B3CE]/15 hover:text-white px-6 py-3 h-auto text-[16px] font-medium shadow-none transition-colors"
            >
              Sugerir ONG
            </Button>
          </SuggestOrgDialog>
        </div>
      </div>
    </div>
  )
}
