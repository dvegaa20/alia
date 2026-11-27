import {
  CauseType,
  OrganizationStatus,
  SocialPlatform,
  type Category,
  type Location,
  type Organization,
  type Prisma,
  type SocialLink,
} from '@/prisma/generated/client'

export type MockOrganization = Organization & {
  location: Location | null
  socialLinks: SocialLink[]
  categories: Category[]
}

export type OrgWithLocationAndCategories = Organization & {
  location: Location | null
  categories: Category[]
  socialLinks?: SocialLink[]
}

/**
 * Local-only fake organizations for testing UI flows without writing to Supabase.
 * Strictly disabled in production builds/deployments.
 */
export function isLocalMockEnabled(): boolean {
  return process.env.NODE_ENV === 'development' && process.env.DISABLE_MOCK_ORGS !== 'true'
}

const BASE_DATE = new Date('2026-09-01T12:00:00.000Z')
const daysAgo = (days: number) => new Date(BASE_DATE.getTime() - days * 86_400_000)

const DEFAULT_HOURS = {
  monday: { open: '09:00', close: '18:00' },
  tuesday: { open: '09:00', close: '18:00' },
  wednesday: { open: '09:00', close: '18:00' },
  thursday: { open: '09:00', close: '18:00' },
  friday: { open: '09:00', close: '17:00' },
  saturday: { open: '10:00', close: '14:00' },
  sunday: null,
} satisfies Prisma.JsonObject

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'mock-cat-medio-ambiente',
    slug: 'medio-ambiente',
    name: 'Medio Ambiente',
    description: 'Conservación de ecosistemas, reforestación y acción climática comunitaria.',
    createdAt: daysAgo(90),
    updatedAt: daysAgo(90),
  },
  {
    id: 'mock-cat-educacion',
    slug: 'educacion',
    name: 'Educación',
    description: 'Acceso a educación de calidad, tutorías, becas y herramientas digitales.',
    createdAt: daysAgo(90),
    updatedAt: daysAgo(90),
  },
  {
    id: 'mock-cat-salud',
    slug: 'salud',
    name: 'Salud',
    description: 'Atención médica comunitaria, salud mental y nutrición preventiva.',
    createdAt: daysAgo(90),
    updatedAt: daysAgo(90),
  },
  {
    id: 'mock-cat-vivienda',
    slug: 'vivienda',
    name: 'Vivienda',
    description: 'Mejoramiento de vivienda digna, infraestructura básica y hábitat seguro.',
    createdAt: daysAgo(90),
    updatedAt: daysAgo(90),
  },
  {
    id: 'mock-cat-derechos-humanos',
    slug: 'derechos-humanos',
    name: 'Derechos Humanos',
    description: 'Acompañamiento legal, inclusión social y defensa de derechos fundamentales.',
    createdAt: daysAgo(90),
    updatedAt: daysAgo(90),
  },
  {
    id: 'mock-cat-infancia',
    slug: 'infancia',
    name: 'Infancia',
    description: 'Protección, alimentación y desarrollo integral para niñas y niños.',
    createdAt: daysAgo(90),
    updatedAt: daysAgo(90),
  },
]

const CAT_BY_SLUG = new Map(MOCK_CATEGORIES.map((c) => [c.slug, c]))
const pickCategories = (...slugs: string[]): Category[] =>
  slugs.map((s) => CAT_BY_SLUG.get(s)).filter((c): c is Category => Boolean(c))

interface MockOrgSeed {
  id: string
  slug: string
  name: string
  shortDescription: string
  fullDescription: string
  coverImageUrl: string
  featured: boolean
  verified: boolean
  causeType: CauseType
  isDonatariaAutorizada: boolean
  website: string
  email: string
  phone: string
  whatsapp: string
  donationLink: string
  address: string
  howToDonate: string
  foundedYear: number
  impactCurrent: number
  impactGoal: number
  impactType: string
  categories: string[]
  city: string
  state: string
  latitude: number
  longitude: number
  daysOld: number
  galleryImages: string[]
  needs: Prisma.JsonArray
  volunteering: Prisma.JsonObject
  events: Prisma.JsonArray
  impactHighlights: Prisma.JsonArray
  impactTestimony: Prisma.JsonObject
  socials: { platform: SocialPlatform; url: string }[]
}

const MOCK_ORG_SEEDS: MockOrgSeed[] = [
  {
    id: 'mock-org-1',
    slug: 'bosque-vivo-oaxaca',
    name: 'Bosque Vivo Oaxaca',
    shortDescription:
      'Restauramos cuencas y bosques comunitarios junto a ejidos de la Sierra Norte con viveros nativos.',
    fullDescription:
      'Bosque Vivo Oaxaca colabora desde 2016 con comunidades de la Sierra Juárez para regenerar bosques de pino-encino afectados por incendios y tala ilegal.\n\nOperamos tres viveros comunitarios y capacitamos a brigadas locales en prevención de incendios y captación de agua de lluvia.',
    coverImageUrl: '/images/landscape1.jpg',
    featured: true,
    verified: true,
    causeType: CauseType.ONG,
    isDonatariaAutorizada: true,
    website: 'https://example.org/bosque-vivo',
    email: 'contacto@bosquevivo-demo.org',
    phone: '+52 951 555 0142',
    whatsapp: '+529515550142',
    donationLink: 'https://example.org/bosque-vivo/donar',
    address: 'Calle Macedonio Alcalá 412, Centro, Oaxaca de Juárez, Oaxaca',
    howToDonate:
      'Puedes apadrinar árboles nativos mediante transferencia o donar herramienta forestal directamente en nuestro centro de acopio en Oaxaca.',
    foundedYear: 2016,
    impactCurrent: 18400,
    impactGoal: 25000,
    impactType: 'Árboles nativos plantados',
    categories: ['medio-ambiente'],
    city: 'Oaxaca de Juárez',
    state: 'Oaxaca',
    latitude: 17.0654,
    longitude: -96.7236,
    daysOld: 2,
    galleryImages: ['/images/landscape1.jpg', '/images/landscape2.jpg', '/images/vertical1.jpg'],
    needs: [
      {
        category: 'material',
        urgency: 'alta',
        title: 'Mangueras y sistemas de riego por goteo',
        description:
          'Requerimos 600 metros de manguera agrícola para mantener plántulas en temporada seca.',
        quantity: '600 metros',
      },
      {
        category: 'voluntariado',
        urgency: 'baja',
        title: 'Brigadas de reforestación de fin de semana',
        description:
          'Acompaña a nuestras cuadrillas comunitarias en jornadas de plantación y cercado.',
        quantity: '20 personas / mes',
      },
    ],
    volunteering: {
      description:
        'Participa en jornadas de vivero, preparación de composta y reforestación guiada junto a técnicos forestales.',
      activities: [
        'Llenado de bolsas en vivero',
        'Reforestación en sierra',
        'Monitoreo de supervivencia',
      ],
      ageRequirement: 'Mayores de 16 años',
    },
    events: [
      {
        id: 'ev-bv-1',
        title: 'Jornada de Reforestación Sierra Norte',
        description:
          'Salida comunitaria para plantar 1,500 pinos nativos con transporte incluido desde el centro.',
        date: '14 de Diciembre, 2026',
        isPast: false,
      },
      {
        id: 'ev-bv-2',
        title: 'Taller de Captación Pluvial',
        description: 'Instalamos 12 sistemas familiares de captación de lluvia en San Pablo Etla.',
        date: '10 de Octubre, 2026',
        isPast: true,
      },
    ],
    impactHighlights: [
      {
        value: '18,400',
        label: 'árboles nativos plantados',
        description: 'Con una tasa de supervivencia superior al 82% tras dos temporadas de secas.',
      },
      { value: '14', label: 'comunidades aliadas' },
      { value: '3', label: 'viveros comunitarios' },
      { value: '420', label: 'voluntarios activos' },
    ],
    impactTestimony: {
      quote:
        'Los viveros nos dieron trabajo estable en el pueblo y hoy nuestros manantiales vuelven a tener agua.',
      author: 'Don Aurelio Méndez',
      role: 'Comisariado ejidal en Sierra Norte',
    },
    socials: [{ platform: SocialPlatform.INSTAGRAM, url: 'https://instagram.com' }],
  },
  {
    id: 'mock-org-2',
    slug: 'aula-abierta-jalisco',
    name: 'Aula Abierta Jalisco',
    shortDescription:
      'Acompañamiento escolar, bibliotecas comunitarias y talleres STEM para niñas y jóvenes en zonas periféricas.',
    fullDescription:
      'Aula Abierta Jalisco impulsa espacios de aprendizaje seguro después de clases en colonias del Área Metropolitana de Guadalajara.\n\nBrindamos tutorías personalizadas en lectura y matemáticas, además de laboratorios de robótica y orientación vocacional.',
    coverImageUrl: '/images/landscape2.jpg',
    featured: true,
    verified: true,
    causeType: CauseType.ONG,
    isDonatariaAutorizada: true,
    website: 'https://example.org/aula-abierta',
    email: 'hola@aulaabierta-demo.org',
    phone: '+52 33 5550 8821',
    whatsapp: '+523355508821',
    donationLink: 'https://example.org/aula-abierta/donar',
    address: 'Av. Chapultepec Sur 284, Americana, Guadalajara, Jalisco',
    howToDonate:
      'Recibimos útiles escolares nuevos, tabletas en buen estado y donativos deducibles de impuestos para becas estudiantiles.',
    foundedYear: 2018,
    impactCurrent: 640,
    impactGoal: 800,
    impactType: 'Estudiantes becados este ciclo',
    categories: ['educacion', 'infancia'],
    city: 'Guadalajara',
    state: 'Jalisco',
    latitude: 20.6736,
    longitude: -103.3687,
    daysOld: 4,
    galleryImages: ['/images/landscape2.jpg', '/images/landscape4.jpg', '/images/vertical2.jpg'],
    needs: [
      {
        category: 'material',
        urgency: 'alta',
        title: 'Laptops o tabletas para laboratorio de cómputo',
        description:
          'Equipos funcionales para que 35 estudiantes de secundaria practiquen programación.',
        quantity: '15 equipos',
      },
      {
        category: 'material',
        urgency: 'baja',
        title: 'Libros infantiles y juveniles en español',
        description: 'Literatura ilustrada y cuentos para nutrir nuestras 4 bibliotecas barriales.',
        quantity: 'Permanente',
      },
    ],
    volunteering: {
      description: 'Sé mentor de lectura o apoya en clubes de ciencias dos horas a la semana.',
      activities: ['Tutorías de matemáticas', 'Club de lectura infantil', 'Talleres de robótica'],
      ageRequirement: 'Mayores de 18 años',
    },
    events: [
      {
        id: 'ev-aa-1',
        title: 'Feria Juvenil de Ciencia Barrial',
        description:
          'Exposición abierta de proyectos creados por alumnas y alumnos de primaria y secundaria.',
        date: '20 de Diciembre, 2026',
        isPast: false,
      },
    ],
    impactHighlights: [
      {
        value: '640',
        label: 'niñas y jóvenes en tutorías',
        description:
          'El 94% de nuestros estudiantes mejoró su comprensión lectora en el último semestre.',
      },
      { value: '4', label: 'bibliotecas comunitarias' },
      { value: '85', label: 'mentores voluntarios' },
    ],
    impactTestimony: {
      quote: 'Aquí descubrí que me encanta programar y ahora quiero estudiar ingeniería.',
      author: 'Valeria Cruz',
      role: 'Estudiante de 3° de secundaria',
    },
    socials: [{ platform: SocialPlatform.INSTAGRAM, url: 'https://instagram.com' }],
  },
  {
    id: 'mock-org-3',
    slug: 'brigada-salud-monterrey',
    name: 'Red Salud Comunitaria NL',
    shortDescription:
      'Consultas médicas gratuitas, detección oportuna y acompañamiento en salud mental para familias vulnerables.',
    fullDescription:
      'Red Salud Comunitaria NL despliega unidades móviles médicas y psicológicas cada semana en municipios periféricos de Nuevo León.\n\nNuestro equipo de médicos voluntarios, enfermeras y psicólogos ofrece atención primaria sin costo.',
    coverImageUrl: '/images/landscape3.jpg',
    featured: true,
    verified: true,
    causeType: CauseType.ONG,
    isDonatariaAutorizada: true,
    website: 'https://example.org/red-salud-nl',
    email: 'atencion@redsaludnl-demo.org',
    phone: '+52 81 5550 3319',
    whatsapp: '+528155503319',
    donationLink: 'https://example.org/red-salud-nl/donar',
    address: 'Calle Padre Mier 905, Centro, Monterrey, Nuevo León',
    howToDonate:
      'Aceptamos medicamentos vigentes no controlados, glucómetros y aportaciones económicas para estudios de laboratorio.',
    foundedYear: 2015,
    impactCurrent: 3200,
    impactGoal: 4000,
    impactType: 'Consultas médicas gratuitas',
    categories: ['salud'],
    city: 'Monterrey',
    state: 'Nuevo León',
    latitude: 25.6714,
    longitude: -100.3161,
    daysOld: 6,
    galleryImages: ['/images/landscape3.jpg', '/images/landscape5.jpg'],
    needs: [
      {
        category: 'material',
        urgency: 'alta',
        title: 'Tiras reactivas para glucosa y baumanómetros',
        description: 'Insumos urgentes para las jornadas de prevención de diabetes e hipertensión.',
        quantity: '40 cajas',
      },
    ],
    volunteering: {
      description:
        'Buscamos estudiantes de medicina, nutrición, psicología y logística para brigadas sabatinas.',
      activities: ['Toma de signos vitales', 'Logística de farmacia', 'Orientación nutricional'],
      ageRequirement: 'Mayores de 18 años',
    },
    events: [
      {
        id: 'ev-rs-1',
        title: 'Brigada Médica en García',
        description: 'Jornada integral con medicina general, optometría y salud bucal.',
        date: '6 de Diciembre, 2026',
        isPast: false,
      },
    ],
    impactHighlights: [
      {
        value: '3,200',
        label: 'consultas brindadas al año',
        description: 'Atención gratuita en comunidades sin clínica cercana.',
      },
      { value: '48', label: 'brigadas móviles' },
      { value: '62', label: 'profesionales voluntarios' },
    ],
    impactTestimony: {
      quote:
        'Me detectaron diabetes a tiempo y me enseñaron cómo cuidarme sin tener que gastar en traslados largos.',
      author: 'Sra. Guadalupe Herrera',
      role: 'Paciente en Escobedo',
    },
    socials: [{ platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com' }],
  },
  {
    id: 'mock-org-4',
    slug: 'ecoclub-estudiantil-cdmx',
    name: 'EcoClub Estudiantil CDMX',
    shortDescription:
      'Iniciativa de estudiantes universitarios que transforma azoteas escolares en huertos urbanos y centros de compostaje.',
    fullDescription:
      'EcoClub Estudiantil nació en 2025 cuando un grupo de estudiantes de preparatoria y universidad decidió recuperar espacios grises en escuelas públicas de la Ciudad de México.\n\nHoy instalamos camas de cultivo, impartimos talleres de separación de residuos y conectamos a jóvenes con la agricultura urbana.',
    coverImageUrl: '/images/landscape4.jpg',
    featured: false,
    verified: true,
    causeType: CauseType.YOUTH_INITIATIVE,
    isDonatariaAutorizada: false,
    website: 'https://example.org/ecoclub-cdmx',
    email: 'hola@ecoclubcdmx-demo.org',
    phone: '+52 55 5550 7710',
    whatsapp: '+525555507710',
    donationLink: 'https://example.org/ecoclub-cdmx/apoyar',
    address: 'Av. Álvaro Obregón 118, Roma Norte, Cuauhtémoc, Ciudad de México',
    howToDonate:
      'Puedes donar tierra negra, semillas orgánicas, palas de jardín o sumarte a nuestras jornadas abiertas los sábados.',
    foundedYear: 2025,
    impactCurrent: 9,
    impactGoal: 15,
    impactType: 'Huertos escolares activos',
    categories: ['medio-ambiente', 'educacion'],
    city: 'Cuauhtémoc',
    state: 'Ciudad de México',
    latitude: 19.4195,
    longitude: -99.1603,
    daysOld: 1,
    galleryImages: ['/images/landscape4.jpg', '/images/vertical3.jpg'],
    needs: [
      {
        category: 'material',
        urgency: 'alta',
        title: 'Madera reciclada y sustrato para camas de cultivo',
        description:
          'Material para construir 6 nuevas camas elevadas en una secundaria de Iztacalco.',
        quantity: '30 costales de sustrato',
      },
    ],
    volunteering: {
      description:
        'Ideal para jóvenes que quieran aprender sobre compostaje, huertos y educación ambiental.',
      activities: ['Construcción de huertos', 'Talleres en escuelas', 'Compostaje comunitario'],
      ageRequirement: '15+ años',
    },
    events: [
      {
        id: 'ev-ec-1',
        title: 'Trueque de Semillas y Plantas',
        description:
          'Encuentro abierto para intercambiar esquejes, semillas y aprender a hacer composta casera.',
        date: '12 de Diciembre, 2026',
        isPast: false,
      },
    ],
    impactHighlights: [
      { value: '9', label: 'huertos escolares creados' },
      { value: '320', label: 'estudiantes participantes' },
      { value: '1.8 ton', label: 'residuos orgánicos compostados' },
    ],
    impactTestimony: {
      quote:
        'Empezamos con cuatro macetas y hoy toda la escuela cosecha lechugas y hierbas aromáticas.',
      author: 'Camila Reyes',
      role: 'Cofundadora de EcoClub',
    },
    socials: [{ platform: SocialPlatform.TIKTOK, url: 'https://tiktok.com' }],
  },
  {
    id: 'mock-org-5',
    slug: 'codigo-barrio-puebla',
    name: 'Código Barrio Puebla',
    shortDescription:
      'Jóvenes programadores enseñando diseño web y habilidades digitales gratuitas a estudiantes de bachillerato.',
    fullDescription:
      'Código Barrio Puebla es una iniciativa juvenil que acerca la tecnología a jóvenes de bachilleratos públicos mediante bootcamps de fin de semana sin costo.\n\nPrestamos equipos durante las sesiones y ayudamos a cada estudiante a publicar su primer portafolio digital.',
    coverImageUrl: '/images/landscape5.jpg',
    featured: false,
    verified: true,
    causeType: CauseType.YOUTH_INITIATIVE,
    isDonatariaAutorizada: false,
    website: 'https://example.org/codigo-barrio',
    email: 'equipo@codigobarrio-demo.org',
    phone: '+52 222 555 4412',
    whatsapp: '+522225554412',
    donationLink: 'https://example.org/codigo-barrio/apoyar',
    address: 'Calle 5 Oriente 608, Analco, Puebla, Puebla',
    howToDonate:
      'Si tienes laptops usadas en buen estado o quieres dar una charla sobre tecnología, escríbenos por WhatsApp.',
    foundedYear: 2025,
    impactCurrent: 110,
    impactGoal: 150,
    impactType: 'Jóvenes capacitados',
    categories: ['educacion'],
    city: 'Puebla',
    state: 'Puebla',
    latitude: 19.0414,
    longitude: -98.2063,
    daysOld: 3,
    galleryImages: ['/images/landscape5.jpg', '/images/landscape2.jpg'],
    needs: [
      {
        category: 'servicios',
        urgency: 'media',
        title: 'Mentores de diseño UX y desarrollo frontend',
        description: 'Profesionistas que puedan revisar proyectos finales dos horas al mes.',
        quantity: '6 mentores',
      },
    ],
    volunteering: {
      description: 'Acompaña a estudiantes de prepa en sus primeros proyectos de código o diseño.',
      activities: ['Mentorías en vivo', 'Revisión de portafolios', 'Charlas de carrera'],
      ageRequirement: '17+ años',
    },
    events: [
      {
        id: 'ev-cb-1',
        title: 'Demo Day Generación Otoño',
        description:
          'Presentación de sitios web desarrollados por 30 estudiantes para negocios locales.',
        date: '19 de Diciembre, 2026',
        isPast: false,
      },
    ],
    impactHighlights: [
      { value: '110', label: 'estudiantes egresados' },
      { value: '24', label: 'proyectos publicados' },
      { value: '100%', label: 'gratuito y abierto' },
    ],
    impactTestimony: {
      quote:
        'Nunca había usado una computadora para crear algo propio; hoy hago páginas para negocios de mi colonia.',
      author: 'Diego Morales',
      role: 'Alumno de bachillerato',
    },
    socials: [{ platform: SocialPlatform.INSTAGRAM, url: 'https://instagram.com' }],
  },
  {
    id: 'mock-org-6',
    slug: 'cimientos-dignos-yucatan',
    name: 'Cimientos Dignos Yucatán',
    shortDescription:
      'Construcción de techos seguros, baños ecológicos y pisos firmes para familias rurales en el sur de Yucatán.',
    fullDescription:
      'Cimientos Dignos trabaja con albañiles locales y voluntariado para sustituir viviendas precarias por espacios resistentes a huracanes y humedad.\n\nCada proyecto se diseña en conjunto con la familia beneficiaria utilizando materiales térmicos de la región.',
    coverImageUrl: '/images/landscape3.jpg',
    featured: true,
    verified: true,
    causeType: CauseType.ONG,
    isDonatariaAutorizada: true,
    website: 'https://example.org/cimientos-dignos',
    email: 'contacto@cimientosdignos-demo.org',
    phone: '+52 999 555 9011',
    whatsapp: '+529995559011',
    donationLink: 'https://example.org/cimientos-dignos/donar',
    address: 'Calle 60 #389, Centro, Mérida, Yucatán',
    howToDonate:
      'Aporta bultos de cemento, lámina térmica o dona desde $200 MXN para el fondo de vivienda rural.',
    foundedYear: 2014,
    impactCurrent: 310,
    impactGoal: 400,
    impactType: 'Viviendas mejoradas',
    categories: ['vivienda'],
    city: 'Mérida',
    state: 'Yucatán',
    latitude: 20.9674,
    longitude: -89.5926,
    daysOld: 8,
    galleryImages: ['/images/landscape3.jpg', '/images/landscape1.jpg'],
    needs: [
      {
        category: 'material',
        urgency: 'alta',
        title: 'Bultos de cemento y varilla',
        description: 'Insumos urgentes para concluir 5 cuartos adicionales antes de fin de año.',
        quantity: '120 bultos',
      },
    ],
    volunteering: {
      description:
        'Únete a brigadas de construcción y pintura los fines de semana en municipios cercanos a Mérida.',
      activities: ['Pisos firmes', 'Pintura térmica', 'Logística de materiales'],
      ageRequirement: 'Mayores de 18 años',
    },
    events: [],
    impactHighlights: [
      { value: '310', label: 'hogares fortalecidos' },
      { value: '1,400', label: 'personas con vivienda segura' },
      { value: '12', label: 'municipios atendidos' },
    ],
    impactTestimony: {
      quote: 'Ahora cuando llueve fuerte dormimos tranquilos sin que se meta el agua por el techo.',
      author: 'Familia Pech Canul',
      role: 'Beneficiarios en Tekax',
    },
    socials: [{ platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com' }],
  },
  {
    id: 'mock-org-7',
    slug: 'casa-puente-tijuana',
    name: 'Casa Puente Frontera Norte',
    shortDescription:
      'Orientación jurídica gratuita, albergue temporal y defensa de derechos humanos para personas en movilidad.',
    fullDescription:
      'Casa Puente Frontera Norte ofrece asesoría legal digna, acompañamiento psicosocial y acceso a información confiable para familias migrantes y solicitantes de refugio en Baja California.',
    coverImageUrl: '/images/landscape1.jpg',
    featured: false,
    verified: true,
    causeType: CauseType.ONG,
    isDonatariaAutorizada: true,
    website: 'https://example.org/casa-puente',
    email: 'defensa@casapuente-demo.org',
    phone: '+52 664 555 2198',
    whatsapp: '+526645552198',
    donationLink: 'https://example.org/casa-puente/donar',
    address: 'Av. Constitución 1420, Zona Centro, Tijuana, Baja California',
    howToDonate:
      'Necesitamos ropa de invierno, kits de higiene personal y donativos para cubrir trámites de identidad.',
    foundedYear: 2017,
    impactCurrent: 2150,
    impactGoal: 2500,
    impactType: 'Asesorías legales gratuitas',
    categories: ['derechos-humanos'],
    city: 'Tijuana',
    state: 'Baja California',
    latitude: 32.5149,
    longitude: -117.0382,
    daysOld: 10,
    galleryImages: ['/images/landscape1.jpg', '/images/vertical1.jpg'],
    needs: [
      {
        category: 'alimentos',
        urgency: 'alta',
        title: 'Despensa no perecedera y leche infantil',
        description:
          'Abasto mensual para nuestro comedor comunitario que atiende a 90 personas diarias.',
        quantity: '200 kg / mes',
      },
      {
        category: 'material',
        urgency: 'baja',
        title: 'Kits de higiene personal',
        description: 'Jabón, cepillos dentales, pasta y toallas sanitarias.',
        quantity: 'Permanente',
      },
    ],
    volunteering: {
      description:
        'Apoya en cocina comunitaria, traducción, ludoteca infantil o asesoría jurídica pro bono.',
      activities: ['Asesoría legal pro bono', 'Comedor comunitario', 'Ludoteca para infancias'],
      ageRequirement: 'Mayores de 18 años',
    },
    events: [],
    impactHighlights: [
      { value: '2,150', label: 'casos acompañados' },
      { value: '90', label: 'comidas diarias servidas' },
      { value: '35', label: 'abogados aliados' },
    ],
    impactTestimony: {
      quote:
        'Nos recibieron con respeto y nos ayudaron a regularizar los documentos de nuestros hijos.',
      author: 'Lucía R.',
      role: 'Madre acompañada en Tijuana',
    },
    socials: [{ platform: SocialPlatform.X, url: 'https://x.com' }],
  },
  {
    id: 'mock-org-8',
    slug: 'semillas-de-lectura-qro',
    name: 'Semillas de Lectura Querétaro',
    shortDescription:
      'Círculos de lectura en voz alta, desayunos nutritivos y ludotecas móviles para la primera infancia.',
    fullDescription:
      'Semillas de Lectura lleva libros ilustrados, juegos didácticos y desayunos escolares a comunidades rurales de Querétaro para fortalecer el desarrollo temprano de niñas y niños de 3 a 10 años.',
    coverImageUrl: '/images/landscape4.jpg',
    featured: false,
    verified: true,
    causeType: CauseType.ONG,
    isDonatariaAutorizada: false,
    website: 'https://example.org/semillas-lectura',
    email: 'hola@semillasqro-demo.org',
    phone: '+52 442 555 6034',
    whatsapp: '+524425556034',
    donationLink: 'https://example.org/semillas-lectura/donar',
    address: 'Andador 5 de Mayo 72, Centro Histórico, Querétaro, Querétaro',
    howToDonate:
      'Dona cuentos infantiles ilustrados, juegos de mesa educativos o patrocina desayunos escolares.',
    foundedYear: 2020,
    impactCurrent: 480,
    impactGoal: 600,
    impactType: 'Niñas y niños atendidos',
    categories: ['infancia', 'educacion'],
    city: 'Querétaro',
    state: 'Querétaro',
    latitude: 20.5888,
    longitude: -100.3899,
    daysOld: 12,
    galleryImages: ['/images/landscape4.jpg', '/images/vertical2.jpg'],
    needs: [
      {
        category: 'alimentos',
        urgency: 'media',
        title: 'Fruta de temporada y avena para desayunos',
        description: 'Complementamos los desayunos de 140 niñas y niños cada semana.',
        quantity: 'Semanal',
      },
    ],
    volunteering: {
      description: 'Cuentacuentos, mediadores de lectura y apoyo en logística de ludoteca móvil.',
      activities: ['Cuentacuentos', 'Juegos didácticos', 'Preparación de desayunos'],
      ageRequirement: 'Mayores de 16 años',
    },
    events: [],
    impactHighlights: [
      { value: '480', label: 'niñas y niños participantes' },
      { value: '1,900', label: 'libros en circulación' },
      { value: '18', label: 'comunidades visitadas' },
    ],
    impactTestimony: {
      quote: 'Cada sábado mis hijos esperan la camioneta de los libros con muchísima emoción.',
      author: 'Paola Ramírez',
      role: 'Madre de familia en Amealco',
    },
    socials: [{ platform: SocialPlatform.INSTAGRAM, url: 'https://instagram.com' }],
  },
  {
    id: 'mock-org-9',
    slug: 'patitas-y-sonrisas-leon',
    name: 'Juventud por el Agua León',
    shortDescription:
      'Colectivo juvenil que monitorea calidad del agua y organiza jornadas de limpieza de arroyos urbanos.',
    fullDescription:
      'Juventud por el Agua León reúne a estudiantes de preparatoria y universidad preocupados por la crisis hídrica en el Bajío.\n\nRealizamos mediciones ciudadanas, campañas de ahorro escolar y jornadas mensuales de saneamiento en arroyos.',
    coverImageUrl: '/images/landscape2.jpg',
    featured: false,
    verified: false,
    causeType: CauseType.YOUTH_INITIATIVE,
    isDonatariaAutorizada: false,
    website: 'https://example.org/juventud-agua-leon',
    email: 'contacto@juventudagua-demo.org',
    phone: '+52 477 555 1120',
    whatsapp: '+524775551120',
    donationLink: 'https://example.org/juventud-agua-leon/apoyar',
    address: 'Blvd. Adolfo López Mateos 1102, Centro, León, Guanajuato',
    howToDonate:
      'Apoya con guantes de trabajo, costales reutilizables y kits básicos de análisis de agua.',
    foundedYear: 2025,
    impactCurrent: 16,
    impactGoal: 24,
    impactType: 'Jornadas de limpieza realizadas',
    categories: ['medio-ambiente'],
    city: 'León',
    state: 'Guanajuato',
    latitude: 21.125,
    longitude: -101.686,
    daysOld: 5,
    galleryImages: ['/images/landscape2.jpg', '/images/vertical3.jpg'],
    needs: [
      {
        category: 'material',
        urgency: 'baja',
        title: 'Guantes de carnaza y costales',
        description: 'Equipo de protección para voluntarios en jornadas de limpieza urbana.',
        quantity: '40 pares',
      },
    ],
    volunteering: {
      description:
        'Cualquier joven con ganas de cuidar el agua en León puede sumarse los domingos.',
      activities: ['Limpieza de cauces', 'Difusión en escuelas', 'Registro fotográfico'],
      ageRequirement: 'Cualquier edad (menores acompañados)',
    },
    events: [],
    impactHighlights: [
      { value: '16', label: 'jornadas de limpieza' },
      { value: '3.4 ton', label: 'residuos retirados' },
      { value: '190', label: 'jóvenes movilizados' },
    ],
    impactTestimony: {
      quote: 'Ver que podemos cambiar un espacio abandonado en una sola mañana te motiva a seguir.',
      author: 'Mateo Navarro',
      role: 'Integrante del colectivo',
    },
    socials: [{ platform: SocialPlatform.INSTAGRAM, url: 'https://instagram.com' }],
  },
]

export const MOCK_ORGANIZATIONS: MockOrganization[] = MOCK_ORG_SEEDS.map((seed) => {
  const createdAt = daysAgo(seed.daysOld)
  const categories = pickCategories(...seed.categories)

  return {
    id: seed.id,
    slug: seed.slug,
    name: seed.name,
    shortDescription: seed.shortDescription,
    fullDescription: seed.fullDescription,
    logoUrl: null,
    coverImageUrl: seed.coverImageUrl,
    status: OrganizationStatus.PUBLISHED,
    featured: seed.featured,
    verified: seed.verified,
    website: seed.website,
    email: seed.email,
    phone: seed.phone,
    donationLink: seed.donationLink,
    causeType: seed.causeType,
    address: seed.address,
    whatsapp: seed.whatsapp,
    isDonatariaAutorizada: seed.isDonatariaAutorizada,
    howToDonate: seed.howToDonate,
    volunteering: seed.volunteering,
    events: seed.events,
    galleryImages: seed.galleryImages,
    impactCurrent: seed.impactCurrent,
    impactGoal: seed.impactGoal,
    impactType: seed.impactType,
    needs: seed.needs,
    relevantLinks: [],
    impactHighlights: seed.impactHighlights,
    impactTestimony: seed.impactTestimony,
    officeHours: DEFAULT_HOURS,
    foundedYear: seed.foundedYear,
    createdAt,
    updatedAt: createdAt,
    location: {
      id: `mock-loc-${seed.id}`,
      city: seed.city,
      state: seed.state,
      googleMapsUrl: `https://maps.google.com/?q=${seed.latitude},${seed.longitude}`,
      latitude: seed.latitude,
      longitude: seed.longitude,
      createdAt,
      updatedAt: createdAt,
      organizationId: seed.id,
    },
    socialLinks: seed.socials.map((s, idx) => ({
      id: `mock-social-${seed.id}-${idx}`,
      platform: s.platform,
      url: s.url,
      createdAt,
      updatedAt: createdAt,
      organizationId: seed.id,
    })),
    categories,
  }
})

export interface OrgQueryFilters {
  categorySlug?: string
  query?: string
  page?: number
  limit?: number
  featured?: boolean
  state?: string
  city?: string
  verified?: boolean
  sort?: string
  causeType?: 'ONG' | 'YOUTH_INITIATIVE'
  isDonatariaAutorizada?: boolean
}

export function mergeAndFilterLocalOrgs(
  dbOrgs: OrgWithLocationAndCategories[],
  filters?: OrgQueryFilters
): {
  orgs: OrgWithLocationAndCategories[]
  total: number
  page: number
  limit: number
  totalPages: number
} {
  const {
    categorySlug,
    query,
    page = 1,
    limit = 10,
    featured,
    state,
    city,
    verified,
    sort,
    causeType,
    isDonatariaAutorizada,
  } = filters || {}

  const seenSlugs = new Set(dbOrgs.map((o) => o.slug))
  const combined = [...dbOrgs, ...MOCK_ORGANIZATIONS.filter((m) => !seenSlugs.has(m.slug))]

  const filtered = combined.filter((org) => {
    if (org.status !== OrganizationStatus.PUBLISHED) return false
    if (causeType && org.causeType !== causeType) return false
    if (isDonatariaAutorizada !== undefined && org.isDonatariaAutorizada !== isDonatariaAutorizada)
      return false
    if (featured !== undefined && org.featured !== featured) return false
    if (verified !== undefined && org.verified !== verified) return false
    if (categorySlug && !org.categories.some((c) => c.slug === categorySlug)) return false
    if (state && !org.location?.state.toLowerCase().includes(state.toLowerCase())) return false
    if (city && !org.location?.city.toLowerCase().includes(city.toLowerCase())) return false
    if (query) {
      const q = query.toLowerCase()
      const matchesName = org.name.toLowerCase().includes(q)
      const matchesDesc = org.shortDescription.toLowerCase().includes(q)
      if (!matchesName && !matchesDesc) return false
    }
    return true
  })

  filtered.sort((a, b) => {
    if (sort === 'name-asc') return a.name.localeCompare(b.name, 'es')
    if (sort === 'name-desc') return b.name.localeCompare(a.name, 'es')
    if (sort === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const total = filtered.length
  const skip = (page - 1) * limit
  const paged = filtered.slice(skip, skip + limit)

  return {
    orgs: paged,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}

export function getLocalAvailableCities(state: string, dbCities: string[] = []): string[] {
  const normalized = state.toLowerCase()
  const mockCities = MOCK_ORGANIZATIONS.filter(
    (o) =>
      o.status === OrganizationStatus.PUBLISHED &&
      o.location?.state.toLowerCase().includes(normalized)
  )
    .map((o) => o.location?.city)
    .filter((c): c is string => Boolean(c))

  return Array.from(new Set([...dbCities, ...mockCities])).sort((a, b) => a.localeCompare(b, 'es'))
}

export function getLocalOrgBySlug(slug: string): MockOrganization | null {
  return MOCK_ORGANIZATIONS.find((o) => o.slug === slug) ?? null
}

export function mergeLocalCategoriesWithOrgs(
  dbCategories: (Category & {
    _count: { organizations: number }
    organizations: (Organization & { location: Location | null })[]
  })[],
  limit = 5
) {
  const bySlug = new Map<
    string,
    Category & {
      _count: { organizations: number }
      organizations: (Organization & { location: Location | null })[]
    }
  >()

  for (const cat of dbCategories) {
    bySlug.set(cat.slug, {
      ...cat,
      organizations: [...cat.organizations],
      _count: { organizations: cat._count.organizations },
    })
  }

  for (const mockCat of MOCK_CATEGORIES) {
    const existing = bySlug.get(mockCat.slug)
    const existingOrgSlugs = new Set(existing?.organizations.map((o) => o.slug) || [])
    const mockOrgsForCat = MOCK_ORGANIZATIONS.filter(
      (o) => o.categories.some((c) => c.slug === mockCat.slug) && !existingOrgSlugs.has(o.slug)
    )

    if (existing) {
      const mergedOrgs = [...existing.organizations, ...mockOrgsForCat]
        .sort((a, b) => Number(b.featured) - Number(a.featured))
        .slice(0, 5)
      existing.organizations = mergedOrgs
      existing._count.organizations += mockOrgsForCat.length
    } else {
      bySlug.set(mockCat.slug, {
        ...mockCat,
        organizations: mockOrgsForCat.slice(0, 5),
        _count: { organizations: mockOrgsForCat.length },
      })
    }
  }

  return Array.from(bySlug.values())
    .sort((a, b) => b._count.organizations - a._count.organizations)
    .slice(0, limit)
}

export function mergeLocalCategoriesWithCount(
  dbCategories: (Category & { _count: { organizations: number } })[]
) {
  const bySlug = new Map<string, Category & { _count: { organizations: number } }>()

  for (const cat of dbCategories) {
    bySlug.set(cat.slug, { ...cat, _count: { organizations: cat._count.organizations } })
  }

  for (const mockCat of MOCK_CATEGORIES) {
    const mockCount = MOCK_ORGANIZATIONS.filter((o) =>
      o.categories.some((c) => c.slug === mockCat.slug)
    ).length
    const existing = bySlug.get(mockCat.slug)
    if (existing) {
      existing._count.organizations += mockCount
    } else {
      bySlug.set(mockCat.slug, { ...mockCat, _count: { organizations: mockCount } })
    }
  }

  return Array.from(bySlug.values())
    .filter((cat) => cat._count.organizations > 0)
    .sort((a, b) => b._count.organizations - a._count.organizations)
}

export function mergeLocalPublicCategories(dbCategories: Category[]): Category[] {
  const bySlug = new Map<string, Category>()
  for (const cat of dbCategories) {
    bySlug.set(cat.slug, cat)
  }
  for (const mockCat of MOCK_CATEGORIES) {
    if (!bySlug.has(mockCat.slug)) {
      bySlug.set(mockCat.slug, mockCat)
    }
  }
  return Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name, 'es'))
}

export function mergeLocalLatestByCategory(
  categorySlug: string,
  dbOrgs: OrgWithLocationAndCategories[] = []
): OrgWithLocationAndCategories[] {
  const seenSlugs = new Set(dbOrgs.map((o) => o.slug))
  const mockOrgsForCat = MOCK_ORGANIZATIONS.filter(
    (o) =>
      o.status === OrganizationStatus.PUBLISHED &&
      o.verified &&
      o.categories.some((c) => c.slug === categorySlug) &&
      !seenSlugs.has(o.slug)
  )

  return [...dbOrgs, ...mockOrgsForCat]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
}
