// Prevent multiple PrismaClient instances in development due to Next.js HMR
// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-management

import { PrismaClient } from ".prisma/client/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = globalThis as unknown as { prisma: any };

export const prisma: InstanceType<typeof PrismaClient> =
  globalForPrisma.prisma ?? new (PrismaClient as any)();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
