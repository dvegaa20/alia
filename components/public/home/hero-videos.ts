export interface HeroVideoItem {
  src: string
  poster?: string
  alt: string
}

export interface ResolvedHeroVideo extends HeroVideoItem {
  hasVideoFile?: boolean
}

export const HERO_VIDEOS: HeroVideoItem[] = [
  {
    src: '/videos/hero-1.mp4',
    poster: '/images/landscape1.jpg',
    alt: 'Voluntarios y trabajo comunitario en México',
  },
  {
    src: '/videos/hero-2.mp4',
    poster: '/images/landscape2.jpg',
    alt: 'Colaboración ciudadana en proyectos sociales locales',
  },
  {
    src: '/videos/hero-3.mp4',
    poster: '/images/landscape3.jpg',
    alt: 'Iniciativas de impacto ambiental y social en comunidad',
  },
]
