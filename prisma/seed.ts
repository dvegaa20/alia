import { OrganizationStatus, SocialPlatform } from '@/prisma/generated/client'
import prisma from '../lib/prisma'

async function main() {
  console.log('Iniciando el seeding de la base de datos...')

  // 1. Limpiar datos existentes
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
      donationLink: 'https://mexico.techo.org/dona/',
      foundedYear: 2006,
      galleryImages: [
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
        'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
      ],
      impactCurrent: 1200,
      impactGoal: 1500,
      impactType: 'Familias beneficiadas',
      relevantLinks: [
        'https://mexico.techo.org/informate/',
        'https://aristeguinoticias.com/2803/mundo/mas-de-cada-4-familias-en-pobreza-en-la-ue-no-pueden-calentar-de-forma-adecuada-sus-hogares/',
        'https://www.un.org/sustainabledevelopment/es/poverty/',
      ],
      featuredFact: {
        value: '8,500',
        unit: 'viviendas',
        label: 'construidas',
        description:
          'Desde nuestra fundación, hemos construido viviendas de emergencia para familias en situación de vulnerabilidad en comunidades de todo México.',
        badge: 'Logro principal',
      },
      secondaryFacts: [
        { value: '120k', unit: 'Voluntarios', label: 'movilizados', icon: 'users', color: 'violet' },
        { value: '19', unit: 'Países', label: 'con presencia', icon: 'globe', color: 'emerald' },
        { value: '450', unit: 'Comunidades', label: 'atendidas', icon: 'home', color: 'sky' },
      ],
      testimony: {
        quote: 'Gracias a TECHO, mi familia tiene un lugar seguro donde vivir. Mis hijos ya no enferman por la humedad.',
        author: 'María González',
        role: 'Beneficiaria en Ecatepec',
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Maria&backgroundColor=b6e3f4',
      },
      milestone: {
        category: 'Vivienda',
        tagline: '18 años construyendo hogares',
        stats: [
          { label: 'Proyectos completados', value: '320' },
          { label: 'Estados con presencia', value: '28' },
        ],
      },
      officeHours: {
        monday: { open: '09:00', close: '18:00' },
        tuesday: { open: '09:00', close: '18:00' },
        wednesday: { open: '09:00', close: '18:00' },
        thursday: { open: '09:00', close: '18:00' },
        friday: { open: '09:00', close: '18:00' },
        saturday: { open: '10:00', close: '14:00' },
        sunday: null,
      },
      categories: ['vivienda', 'derechos-humanos'],
      location: {
        city: 'Cuauhtémoc',
        state: 'Ciudad de México',
        googleMapsUrl: 'https://maps.app.goo.gl/techo',
      },
      socials: [{ platform: SocialPlatform.INSTAGRAM, url: 'https://instagram.com/techomx' }],
    },
    {
      slug: 'greenpeace-mexico',
      name: 'Greenpeace México',
      shortDescription:
        'Defendemos el medio ambiente y promovemos la paz a través de campañas no violentas.',
      fullDescription:
        'Greenpeace es una organización ecologista internacional que utiliza la acción directa no violenta para exponer amenazas al medio ambiente y promover soluciones para un futuro verde y pacífico.',
      status: OrganizationStatus.PUBLISHED,
      featured: true,
      verified: true,
      website: 'https://www.greenpeace.org/mexico/',
      email: 'greenpeace.mexico@greenpeace.org',
      donationLink: 'https://www.greenpeace.org/mexico/dona/',
      foundedYear: 1993,
      galleryImages: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
        'https://images.unsplash.com/photo-1518173946687-a1e7ee1dd5e7?w=800',
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      ],
      impactCurrent: 3200,
      impactGoal: 5000,
      impactType: 'Hectáreas protegidas',
      relevantLinks: [
        'https://www.greenpeace.org/mexico/blog/',
        'https://www.apple.com/mx/environment/',
      ],
      featuredFact: {
        value: '1,240',
        unit: 'árboles',
        label: 'plantados',
        description:
          'Gracias a tu apoyo continuo hemos superado la meta anual en un 15%. Cada árbol representa una promesa de futuro más verde para las comunidades locales.',
        badge: 'Logro principal',
      },
      secondaryFacts: [
        { value: '45k', unit: 'Litros', label: 'de agua filtrada', icon: 'droplet', color: 'sky' },
        { value: '850', unit: 'Voluntarios', label: 'miembros activos', icon: 'users', color: 'violet' },
        { value: '12', unit: 'Zonas', label: 'reforestadas', icon: 'globe', color: 'emerald' },
      ],
      testimony: {
        quote:
          'La llegada de Greenpeace cambió cómo nuestros hijos ven el monte. Ya no es solo un bosque; es nuestro patrimonio.',
        author: 'Mateo Rivera',
        role: 'Coordinador Local',
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Mateo&backgroundColor=b6e3f4',
      },
      milestone: {
        category: 'Medio ambiente',
        tagline: '31 años defendiendo el planeta',
        stats: [
          { label: 'Campañas lanzadas', value: '95' },
          { label: 'Especies protegidas', value: '42' },
        ],
      },
      officeHours: {
        monday: { open: '09:00', close: '18:00' },
        tuesday: { open: '09:00', close: '18:00' },
        wednesday: { open: '09:00', close: '18:00' },
        thursday: { open: '09:00', close: '18:00' },
        friday: { open: '09:00', close: '17:00' },
        saturday: null,
        sunday: null,
      },
      categories: ['medio-ambiente'],
      location: {
        city: 'Coyoacán',
        state: 'Ciudad de México',
      },
    },
    {
      slug: 'cruz-roja-mexicana',
      name: 'Cruz Roja Mexicana',
      shortDescription:
        'Institución humanitaria de asistencia privada dedicada a preservar la salud y la vida.',
      fullDescription:
        'La Cruz Roja Mexicana es una institución humanitaria de asistencia privada, sin fines de lucro. Proporciona auxilio voluntario, no discriminatorio, en situaciones de emergencia y desastres naturales, además de servicios de salud y asistencia social.',
      status: OrganizationStatus.PUBLISHED,
      featured: false,
      verified: true,
      website: 'https://www.cruzrojamexicana.org.mx/',
      email: 'info@cruzrojamexicana.org.mx',
      donationLink: 'https://www.cruzrojamexicana.org.mx/dona',
      foundedYear: 1910,
      galleryImages: [
        'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800',
        'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
        'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800',
      ],
      impactCurrent: 950000,
      impactGoal: 1000000,
      impactType: 'Personas atendidas',
      relevantLinks: [
        'https://www.cruzrojamexicana.org.mx/que-hacemos',
      ],
      featuredFact: {
        value: '950k',
        unit: 'personas',
        label: 'atendidas anualmente',
        description:
          'Cada año respondemos a emergencias, desastres naturales y situaciones de crisis, brindando atención médica y asistencia humanitaria.',
        badge: 'Impacto anual',
      },
      secondaryFacts: [
        { value: '45k', unit: 'Voluntarios', label: 'activos', icon: 'users', color: 'violet' },
        { value: '32', unit: 'Estados', label: 'con presencia', icon: 'globe', color: 'emerald' },
        { value: '580', unit: 'Ambulancias', label: 'operativas', icon: 'heart', color: 'rose' },
      ],
      testimony: {
        quote:
          'Cuando el temblor destruyó nuestra comunidad, la Cruz Roja fue la primera en llegar. Nos dieron esperanza.',
        author: 'Carlos Mendoza',
        role: 'Sobreviviente del sismo 2017',
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Carlos&backgroundColor=ffd5dc',
      },
      milestone: {
        category: 'Salud',
        tagline: '114 años salvando vidas',
        stats: [
          { label: 'Centros de operación', value: '168' },
          { label: 'Personal capacitado', value: '12k' },
        ],
      },
      officeHours: {
        monday: { open: '08:00', close: '20:00' },
        tuesday: { open: '08:00', close: '20:00' },
        wednesday: { open: '08:00', close: '20:00' },
        thursday: { open: '08:00', close: '20:00' },
        friday: { open: '08:00', close: '20:00' },
        saturday: { open: '09:00', close: '15:00' },
        sunday: { open: '09:00', close: '14:00' },
      },
      categories: ['salud'],
      location: {
        city: 'Miguel Hidalgo',
        state: 'Ciudad de México',
      },
    },
    {
      slug: 'save-the-children-mx',
      name: 'Save the Children México',
      shortDescription:
        'Luchamos por los derechos de las niñas, niños y adolescentes en México y el mundo.',
      fullDescription:
        'Save the Children México trabaja en las comunidades más vulnerables del país para garantizar que los niños y niñas tengan acceso a educación, salud, nutrición y protección contra la violencia.',
      status: OrganizationStatus.PUBLISHED,
      featured: true,
      verified: true,
      website: 'https://www.savethechildren.mx/',
      email: 'atencion.donantes@savethechildren.org',
      donationLink: 'https://www.savethechildren.mx/dona',
      foundedYear: 1973,
      galleryImages: [
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
        'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
        'https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?w=800',
      ],
      impactCurrent: 680000,
      impactGoal: 800000,
      impactType: 'Niños beneficiados',
      relevantLinks: [
        'https://www.savethechildren.mx/que-hacemos',
        'https://www.unicef.org/mexico/',
      ],
      featuredFact: {
        value: '680k',
        unit: 'niños',
        label: 'beneficiados',
        description:
          'Programas de educación, salud y protección que transforman las vidas de niñas, niños y adolescentes en las comunidades más vulnerables de México.',
        badge: 'Impacto 2024',
      },
      secondaryFacts: [
        { value: '2.5k', unit: 'Escuelas', label: 'apoyadas', icon: 'book', color: 'sky' },
        { value: '350', unit: 'Comunidades', label: 'atendidas', icon: 'home', color: 'violet' },
        { value: '18', unit: 'Estados', label: 'con programas', icon: 'globe', color: 'emerald' },
      ],
      testimony: {
        quote:
          'Ahora puedo ir a la escuela y soñar con ser doctora. Save the Children me dio la oportunidad que necesitaba.',
        author: 'Sofía Ramírez',
        role: 'Beneficiaria, 12 años',
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Sofia&backgroundColor=c0aede',
      },
      milestone: {
        category: 'Infancia',
        tagline: '51 años protegiendo la infancia',
        stats: [
          { label: 'Programas activos', value: '48' },
          { label: 'Alianzas públicas', value: '85' },
        ],
      },
      officeHours: {
        monday: { open: '09:00', close: '18:00' },
        tuesday: { open: '09:00', close: '18:00' },
        wednesday: { open: '09:00', close: '18:00' },
        thursday: { open: '09:00', close: '18:00' },
        friday: { open: '09:00', close: '17:00' },
        saturday: null,
        sunday: null,
      },
      categories: ['infancia', 'educacion', 'derechos-humanos'],
      location: {
        city: 'Cuauhtémoc',
        state: 'Ciudad de México',
        googleMapsUrl: 'https://maps.app.goo.gl/savethechildren',
      },
    },
    {
      slug: 'amnistia-internacional',
      name: 'Amnistía Internacional México',
      shortDescription:
        'Movimiento global impulsado por personas que hacen campaña para visibilizar los derechos humanos.',
      fullDescription:
        'Amnistía Internacional es un movimiento global de más de 10 millones de personas que realizan campañas para que los derechos humanos internacionalmente reconocidos sean respetados y protegidos.',
      status: OrganizationStatus.PUBLISHED,
      featured: false,
      verified: true,
      website: 'https://amnistia.org.mx/',
      email: 'info@amnistia.org.mx',
      foundedYear: 1971,
      galleryImages: [
        'https://images.unsplash.com/photo-1591189863345-271e0610bb66?w=800',
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
        'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
      ],
      impactCurrent: 8500,
      impactGoal: 10000,
      impactType: 'Acciones urgentes enviadas',
      relevantLinks: [
        'https://amnistia.org.mx/contenido/que-hacemos/',
      ],
      featuredFact: {
        value: '10M+',
        unit: 'personas',
        label: 'en el movimiento global',
        description:
          'Un movimiento global de personas que defienden los derechos humanos y luchan contra la injusticia en más de 150 países.',
        badge: 'Presencia global',
      },
      secondaryFacts: [
        { value: '8.5k', unit: 'Acciones', label: 'urgentes enviadas', icon: 'megaphone', color: 'rose' },
        { value: '150+', unit: 'Países', label: 'con presencia', icon: 'globe', color: 'emerald' },
        { value: '48', unit: 'Informes', label: 'publicados este año', icon: 'file-text', color: 'sky' },
      ],
      testimony: {
        quote:
          'Amnistía amplificó la voz de nuestra comunidad cuando más peligroso era hablar. Cada firma cuenta.',
        author: 'Daniela Torres',
        role: 'Activista comunitaria',
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Daniela&backgroundColor=d1d4f9',
      },
      milestone: {
        category: 'Derechos Humanos',
        tagline: '53 años defendiendo libertades',
        stats: [
          { label: 'Casos documentados', value: '2.4k' },
          { label: 'Campañas activas', value: '15' },
        ],
      },
      officeHours: {
        monday: { open: '09:00', close: '18:00' },
        tuesday: { open: '09:00', close: '18:00' },
        wednesday: { open: '09:00', close: '18:00' },
        thursday: { open: '09:00', close: '18:00' },
        friday: { open: '09:00', close: '16:00' },
        saturday: null,
        sunday: null,
      },
      categories: ['derechos-humanos'],
      location: {
        city: 'Benito Juárez',
        state: 'Ciudad de México',
      },
    },
    {
      slug: 'wwf-mexico',
      name: 'WWF México',
      shortDescription:
        'El Fondo Mundial para la Naturaleza trabaja para detener la degradación del ambiente natural del planeta.',
      fullDescription:
        'WWF México trabaja en la conservación de los ecosistemas más importantes del país, incluyendo selvas, bosques, costas y mares, promoviendo el desarrollo sustentable y la participación comunitaria.',
      status: OrganizationStatus.PUBLISHED,
      featured: false,
      verified: true,
      website: 'https://www.wwf.org.mx/',
      email: 'donativos@wwfmex.org',
      donationLink: 'https://www.wwf.org.mx/dona',
      foundedYear: 1990,
      galleryImages: [
        'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
        'https://images.unsplash.com/photo-1518173946687-a1e7ee1dd5e7?w=800',
      ],
      impactCurrent: 4200,
      impactGoal: 5000,
      impactType: 'Hectáreas conservadas',
      relevantLinks: [
        'https://www.wwf.org.mx/que_hacemos/',
        'https://www.worldwildlife.org/',
      ],
      featuredFact: {
        value: '4,200',
        unit: 'hectáreas',
        label: 'conservadas',
        description:
          'Áreas naturales protegidas y ecosistemas restaurados gracias a nuestros programas de conservación y la participación de las comunidades.',
        badge: 'Conservación activa',
      },
      secondaryFacts: [
        { value: '18', unit: 'Especies', label: 'en recuperación', icon: 'leaf', color: 'emerald' },
        { value: '35', unit: 'Proyectos', label: 'activos', icon: 'target', color: 'sky' },
        { value: '120', unit: 'Comunidades', label: 'aliadas', icon: 'users', color: 'violet' },
      ],
      testimony: {
        quote:
          'Con WWF aprendimos a producir sin destruir. Ahora nuestro café es orgánico y nuestro bosque sigue en pie.',
        author: 'Roberto Sánchez',
        role: 'Productor en Chiapas',
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Roberto&backgroundColor=ffdfbf',
      },
      milestone: {
        category: 'Medio ambiente',
        tagline: '34 años conservando la biodiversidad',
        stats: [
          { label: 'Ecosistemas protegidos', value: '12' },
          { label: 'Alianzas corporativas', value: '65' },
        ],
      },
      officeHours: {
        monday: { open: '09:00', close: '18:00' },
        tuesday: { open: '09:00', close: '18:00' },
        wednesday: { open: '09:00', close: '18:00' },
        thursday: { open: '09:00', close: '18:00' },
        friday: { open: '09:00', close: '17:00' },
        saturday: null,
        sunday: null,
      },
      categories: ['medio-ambiente'],
      location: {
        city: 'Benito Juárez',
        state: 'Ciudad de México',
        googleMapsUrl: 'https://maps.app.goo.gl/wwf',
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
