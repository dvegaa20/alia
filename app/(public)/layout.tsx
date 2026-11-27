import { Navbar, Footer, OrgSearchProvider } from '@/components/public'

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <OrgSearchProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </OrgSearchProvider>
  )
}
