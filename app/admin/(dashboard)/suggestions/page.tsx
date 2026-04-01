import { getAdminSuggestions } from "@/server/actions"
import { SuggestionsTable } from "@/components/admin/suggestions-table"

export const metadata = {
  title: "Sugerencias | Admin Panel",
}

type SearchParams = Promise<{
  q?: string
  status?: string
  page?: string
}>

export default async function SuggestionsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams

  const result = await getAdminSuggestions({
    query: params.q,
    status: params.status,
    page: params.page ? Number(params.page) : 1,
    limit: 10,
  })

  const suggestions = result.data ?? []
  const meta = result.meta ?? { total: 0, page: 1, limit: 10, totalPages: 1 }

  return (
    <div className="space-y-10">
      <SuggestionsTable suggestions={suggestions} meta={meta} />
    </div>
  )
}