import { Sparkles } from "lucide-react"

export function InsightCard() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-primary p-10 text-primary-foreground flex flex-col md:flex-row items-center gap-8 shadow-sm">
      <div className="relative z-10 space-y-3 md:max-w-xl">
        <div className="flex items-center gap-2 text-primary-foreground/70">
          <Sparkles className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Digital Curator Insight
          </span>
        </div>
        <h3 className="text-2xl font-bold leading-tight text-primary-foreground">
          Las sugerencias han aumentado un 12% esta semana. Revisa la bandeja de
          entrada para nuevas entradas.
        </h3>
        <p className="text-primary-foreground/80 text-sm leading-relaxed">
          El sistema ha identificado 3 organizaciones potenciales en la categoría
          'Educación' que podrían requerir verificación inmediata para el
          boletín de fin de mes.
        </p>
      </div>
      
      {/* Asymmetric Decorative Elements relative to primary foreground and background */}
      <div className="hidden md:block absolute -right-12 -bottom-12 w-64 h-64 bg-background/20 rounded-full blur-3xl"></div>
      <div className="hidden md:block absolute right-24 top-0 w-48 h-48 bg-background/10 rounded-full blur-2xl"></div>
      
      <button className="relative z-10 mt-6 md:mt-0 ml-auto bg-background text-foreground px-8 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-muted hover:scale-[1.02] transition-transform active:scale-[0.98]">
        Ver Sugerencias
      </button>
    </div>
  )
}
