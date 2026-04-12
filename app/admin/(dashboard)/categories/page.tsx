import { getAdminCategories } from '@/server/actions'
import { CategoriesTable } from '@/components/admin/categories-table'

export const metadata = {
  title: 'Categorías | Admin Panel',
}

export default async function CategoriesPage() {
  const result = await getAdminCategories()
  const categories = result.data ?? []

  return (
    <div className="space-y-10">
      <CategoriesTable categories={categories} />
    </div>
  )
}
