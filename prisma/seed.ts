import { OrganizationStatus, SocialPlatform } from '@/prisma/generated/client'
import prisma from '../lib/prisma'

async function main() {
  console.log('Iniciando el seeding de la base de datos...')

  // 1. Limpiar datos existentes (opcional pero útil en desarrollo)
  await prisma.socialLink.deleteMany()
  await prisma.location.deleteMany()
  await prisma.organization.deleteMany()
  await prisma.category.deleteMany()

  // 2. Crear Categorías
  const categoriesData = [
    {
      slug: 'medio-ambiente',
      name: 'Medio Ambiente',
      description: 'Protección y conservación del entorno natural.',
    },
    {
      slug: 'educacion',
      name: 'Educación',
      description: 'Acceso a educación de calidad y desarrollo integral.',
    },
    { slug: 'salud', name: 'Salud', description: 'Atención médica, investigación y bienestar.' },
    {
      slug: 'vivienda',
      name: 'Vivienda',
      description: 'Hábitat adecuado y desarrollo comunitario.',
    },
    {
      slug: 'derechos-humanos',
      name: 'Derechos Humanos',
      description: 'Defensa de los derechos fundamentales de las personas.',
    },
    {
      slug: 'infancia',
      name: 'Infancia',
      description: 'Protección y desarrollo de niños y niñas.',
    },
  ]

  const categoryMap = new Map()
  for (const cat of categoriesData) {
    const createdCat = await prisma.category.create({ data: cat })
    categoryMap.set(cat.slug, createdCat.id)
  }

  // 3. Crear Organizaciones
  const orgsData = [
    {
      slug: 'techo-mexico',
      name: 'TECHO México',
      shortDescription:
        'Trabajamos activamente para superar la situación de pobreza que viven millones de personas en asentamientos populares.',
      fullDescription:
        'TECHO es una organización presente en 19 países de América Latina, que busca superar la situación de pobreza que viven millones de personas en asentamientos populares, a través de la acción conjunta de sus habitantes y jóvenes voluntarios y voluntarias.',
      status: OrganizationStatus.PUBLISHED,
      featured: true,
      verified: true,
      website: 'https://mexico.techo.org/',
      email: 'contacto.mexico@techo.org',
      categories: ['vivienda', 'derechos-humanos'],
      location: {
        street: 'Manzanillo',
        exteriorNumber: '15',
        interiorNumber: 'PB',
        neighborhood: 'Roma Norte',
        city: 'Cuauhtémoc',
        state: 'Ciudad de México',
        postalCode: '06700',
      },
      socials: [{ platform: SocialPlatform.INSTAGRAM, url: 'https://instagram.com/techomx' }],
    },
    {
      slug: 'greenpeace-mexico',
      name: 'Greenpeace México',
      shortDescription:
        'Defendemos el medio ambiente y promovemos la paz a través de campañas no violentas.',
      status: OrganizationStatus.PUBLISHED,
      featured: true,
      verified: true,
      website: 'https://www.greenpeace.org/mexico/',
      email: 'greenpeace.mexico@greenpeace.org',
      categories: ['medio-ambiente'],
      location: {
        street: 'Las Flores',
        exteriorNumber: '35',
        neighborhood: 'Candelaria',
        city: 'Coyoacán',
        state: 'Ciudad de México',
        postalCode: '04380',
      },
    },
    {
      slug: 'cruz-roja-mexicana',
      name: 'Cruz Roja Mexicana',
      shortDescription:
        'Institución humanitaria de asistencia privada dedicada a preservar la salud y la vida.',
      status: OrganizationStatus.PUBLISHED,
      featured: false,
      verified: true,
      website: 'https://www.cruzrojamexicana.org.mx/',
      email: 'info@cruzrojamexicana.org.mx',
      categories: ['salud'],
      location: {
        street: 'Juan Luis Vives',
        exteriorNumber: '200',
        neighborhood: 'Los Morales Polanco',
        city: 'Miguel Hidalgo',
        state: 'Ciudad de México',
        postalCode: '11510',
      },
    },
    {
      slug: 'save-the-children-mx',
      name: 'Save the Children México',
      shortDescription:
        'Luchamos por los derechos de las niñas, niños y adolescentes en México y el mundo.',
      status: OrganizationStatus.PUBLISHED,
      featured: true,
      verified: true,
      website: 'https://www.savethechildren.mx/',
      email: 'atencion.donantes@savethechildren.org',
      categories: ['infancia', 'educacion', 'derechos-humanos'],
      location: {
        street: 'Av. Francisco I. Madero',
        exteriorNumber: '10',
        neighborhood: 'Centro Histórico',
        city: 'Cuauhtémoc',
        state: 'Ciudad de México',
        postalCode: '06000',
      },
    },
    {
      slug: 'amnistia-internacional',
      name: 'Amnistía Internacional México',
      shortDescription:
        'Movimiento global impulsado por personas que hacen campaña para visibilizar los derechos humanos.',
      status: OrganizationStatus.PUBLISHED,
      featured: false,
      verified: true,
      website: 'https://amnistia.org.mx/',
      email: 'info@amnistia.org.mx',
      categories: ['derechos-humanos'],
      location: {
        street: 'Luz Saviñón',
        exteriorNumber: '519',
        neighborhood: 'Del Valle Norte',
        city: 'Benito Juárez',
        state: 'Ciudad de México',
        postalCode: '03103',
      },
    },
    {
      slug: 'wwf-mexico',
      name: 'WWF México',
      shortDescription:
        'El Fondo Mundial para la Naturaleza trabaja para detener la degradación del ambiente natural del planeta.',
      status: OrganizationStatus.PUBLISHED,
      featured: false,
      verified: true,
      website: 'https://www.wwf.org.mx/',
      email: 'donativos@wwfmex.org',
      categories: ['medio-ambiente'],
      location: {
        street: 'Av. Revolución',
        exteriorNumber: '1000',
        neighborhood: 'San Juan',
        city: 'Benito Juárez',
        state: 'Ciudad de México',
        postalCode: '03730',
      },
    },
  ]

  for (const org of orgsData) {
    const { categories, location, socials, ...orgDetails } = org

    const connectCategories = categories.map((slug) => ({
      id: categoryMap.get(slug),
    }))

    await prisma.organization.create({
      data: {
        ...orgDetails,
        categories: {
          connect: connectCategories,
        },
        location: {
          create: location,
        },
        socialLinks: socials
          ? {
              create: socials,
            }
          : undefined,
      },
    })
  }

  console.log(
    `Seeding completado con éxito: ${categoriesData.length} categorías y ${orgsData.length} organizaciones creadas.`
  )
}

main()
  .catch((e) => {
    console.error('Error durante el seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
