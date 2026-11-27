import fs from 'node:fs'
import path from 'node:path'
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
  const hasFounderPhoto = fs.existsSync(
    path.join(process.cwd(), 'public', 'images', 'founder-working.jpg')
  )

  return (
    <>
      <AboutHeroSection />
      <ProblemSection />
      <StorySection founderImageSrc={hasFounderPhoto ? '/images/founder-working.jpg' : null} />
      <PillarsSection />
      <TransparencySection />
      <CtaSection />
    </>
  )
}
