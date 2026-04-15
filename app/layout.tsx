import type { Metadata } from 'next'
import { DM_Serif_Text, PT_Serif } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { SmoothScrolling } from '@/components/providers/smooth-scrolling'
import { WebsiteJsonLd } from '@/components/seo/json-ld'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const dmSerifText = DM_Serif_Text({
  subsets: ['latin'],
  variable: '--font-dm-serif',
  weight: ['400'],
})

const ptSerif = PT_Serif({
  subsets: ['latin'],
  variable: '--font-pt-serif',
  weight: ['400', '700'],
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
      </head>
      <body className={`${dmSerifText.variable} ${ptSerif.variable} antialiased`}>
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
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
    </html>
  )
}
