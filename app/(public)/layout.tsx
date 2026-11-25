import fs from 'node:fs'
import path from 'node:path'
import { Navbar, Footer, OrgSearchProvider } from '@/components/public'

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const publicDir = path.join(process.cwd(), 'public')
  const hasLogoLight = fs.existsSync(path.join(publicDir, 'logo-light.svg'))
  const hasLogoDark = fs.existsSync(path.join(publicDir, 'logo-dark.svg'))

  return (
    <OrgSearchProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar hasLogoLight={hasLogoLight} hasLogoDark={hasLogoDark} />
        <main className="flex-1">{children}</main>
        <Footer hasLogoLight={hasLogoLight} hasLogoDark={hasLogoDark} />
      </div>
    </OrgSearchProvider>
  )
}
