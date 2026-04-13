import type { Metadata } from 'next'
import { Exo_2, Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { SmoothScrolling } from '@/components/providers/smooth-scrolling'
import { WebsiteJsonLd } from '@/components/seo/json-ld'
import './globals.css'

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://alia.mx'),
  title: {
    default: 'Alia — Directorio Social de México',
    template: '%s | Alia',
  },
  description:
    'Descubre organizaciones sociales verificadas y conecta con proyectos que transforman realidades en México.',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Alia',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <WebsiteJsonLd />
        {/* Material Symbols for pillar icons */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <style>{`.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }`}</style>
      </head>
      <body className={`${exo2.variable} ${inter.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrolling>{children}</SmoothScrolling>
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
