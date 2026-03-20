import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrolling } from "@/components/providers/smooth-scrolling";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-label",
});

export const metadata: Metadata = {
  title: "Directorio Social — Encuentra y apoya causas que importan",
  description:
    "Descubre organizaciones sociales verificadas y conecta directamente con proyectos que transforman realidades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}

