import { TrendingUp } from "lucide-react"

export function StatsGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1 */}
      <div className="bg-card p-6 rounded-xl border flex flex-col gap-1 shadow-sm">
        <span className="text-xs font-medium text-muted-foreground">
          Total Organizaciones
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-bold text-card-foreground">124</span>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded-full">
            +3
          </span>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-card p-6 rounded-xl border flex flex-col gap-1 shadow-sm">
        <span className="text-xs font-medium text-muted-foreground">
          Pendientes de Revisión
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-bold text-card-foreground">5</span>
          <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-500/20 px-1.5 py-0.5 rounded-full">
            Urgente
          </span>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-card p-6 rounded-xl border flex flex-col gap-1 shadow-sm">
        <span className="text-xs font-medium text-muted-foreground">
          Categorías Activas
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-bold text-card-foreground">8</span>
          <span className="text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
            Estable
          </span>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-card p-6 rounded-xl border flex flex-col gap-1 shadow-sm">
        <span className="text-xs font-medium text-muted-foreground">
          Sugerencias Semanales
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-bold text-card-foreground">+12%</span>
          <TrendingUp className="text-emerald-500 h-4 w-4" />
        </div>
      </div>
    </section>
  )
}
