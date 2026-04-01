import prisma from "@/lib/prisma"
import { SuggestionStatus } from "@/prisma/generated/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export async function StatsGrid() {
  const [totalOrgs, pendingSuggestions, totalCategories] = await Promise.all([
    prisma.organization.count({ where: { status: { not: "ARCHIVED" } } }),
    prisma.suggestion.count({ where: { status: SuggestionStatus.PENDING } }),
    prisma.category.count(),
  ])

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card 1 */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Total Organizaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-card-foreground">{totalOrgs}</span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded-full">
              Activas
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Card 2 */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Categorías Activas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-card-foreground">{totalCategories}</span>
            <span className="text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
              Globales
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Card 3 */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Pendientes de Revisión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-card-foreground">{pendingSuggestions}</span>
            {pendingSuggestions > 0 ? (
              <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-500/20 px-1.5 py-0.5 rounded-full">
                Requieren atención
              </span>
            ) : (
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded-full">
                Al día
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
