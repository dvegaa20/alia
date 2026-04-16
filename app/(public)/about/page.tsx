import { type Metadata } from 'next'
import {
  AboutHeroSection,
  ProblemSection,
  StorySection,
  PillarsSection,
  TransparencySection,
  CtaSection,
} from '@/components/public'

export const metadata: Metadata = {
  title: 'Sobre el Proyecto',
  description:
    'Conoce la misión de Alia: unir voluntades con iniciativas sociales que transforman nuestra realidad en México.',
  alternates: { canonical: '/about' },
}

export default function SobreElProyectoPage() {
  return (
    <>
      <AboutHeroSection />
      <ProblemSection />
      <StorySection />
      <PillarsSection />
      <TransparencySection />
      <CtaSection />
    </>
  )
}
