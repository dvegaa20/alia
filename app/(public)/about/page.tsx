import { type Metadata } from 'next'
import { AboutHeroSection, ProblemSection, PillarsSection, CtaSection } from '@/components/public'

export const metadata: Metadata = {
  title: 'Sobre el Proyecto',
  description:
    'Conoce la misión de Alia: conectar personas con organizaciones sociales que transforman comunidades en México.',
  alternates: { canonical: '/about' },
}

export default function SobreElProyectoPage() {
  return (
    <>
      <AboutHeroSection />
      <ProblemSection />
      <PillarsSection />
      <CtaSection />
    </>
  )
}
