import { PrismaClient } from '@/prisma/generated/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const prismaClientSingleton = () => {
  // 1. Creamos el Pool de conexiones usando tu URL de Supabase
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  // 2. Envolvemos el pool en el adaptador de Prisma
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adapter = new PrismaPg(pool as any)

  // 3. ¡Ahora sí! Instanciamos Prisma pasándole el adaptador que exige la versión 7
  return new PrismaClient({ adapter })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
