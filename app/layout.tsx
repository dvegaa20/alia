import type { Metadata } from 'next'
import { Inter_Tight, Newsreader, JetBrains_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { SmoothScrolling } from '@/components/providers/smooth-scrolling'
import { WebsiteJsonLd } from '@/components/seo/json-ld'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  weight: ['300', '400', '500', '600'],
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  style: ['italic'],
  weight: ['400'],
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://alia.mx'),
  title: {
    default: 'Alia',
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
    <html
      lang="es"
      className={`${interTight.variable} ${newsreader.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <WebsiteJsonLd />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <SmoothScrolling>{children}</SmoothScrolling>
        <Toaster position="bottom-right" richColors closeButton />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
    </html>
  )
}
