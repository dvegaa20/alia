import prisma from "@/lib/prisma"

export async function StatsGrid() {
  const [totalOrgs, pendingOrgs, totalCategories] = await Promise.all([
    prisma.organization.count(),
    prisma.organization.count({ where: { status: "DRAFT" } }),
    prisma.category.count(),
  ])

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-card p-6 rounded-xl border flex flex-col gap-1 shadow-sm">
        <span className="text-xs font-medium text-muted-foreground">
          Total Organizaciones
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-bold text-card-foreground">{totalOrgs}</span>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded-full">
            Registradas
          </span>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-card p-6 rounded-xl border flex flex-col gap-1 shadow-sm">
        <span className="text-xs font-medium text-muted-foreground">
          Categorías Activas
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-bold text-card-foreground">{totalCategories}</span>
          <span className="text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
            Globales
          </span>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-card p-6 rounded-xl border flex flex-col gap-1 shadow-sm">
        <span className="text-xs font-medium text-muted-foreground">
          Pendientes de Revisión
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-bold text-card-foreground">{pendingOrgs}</span>
          {pendingOrgs > 0 ? (
            <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-500/20 px-1.5 py-0.5 rounded-full">
              Requieren atención
            </span>
          ) : (
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded-full">
              Al día
            </span>
          )}
        </div>
      </div>

    </section>
  )
}
