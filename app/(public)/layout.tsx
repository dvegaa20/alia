import { Navbar, Footer } from '@/components/public'
import { getTopCategoriesWithOrgs } from '@/server/actions/categories'

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data: topCategories } = await getTopCategoriesWithOrgs(3)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer topCategories={topCategories || []} />
    </div>
  )
}
