import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

/**
 * Reusable type for Prisma transactions, useful for passing the transactional client to helper functions.
 */
export type TxClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0]

/**
 * A wrapper for admin server actions that require authentication.
 * Checks for a valid userId from Clerk before executing the action.
 * 
 * @param action The server action to execute if authenticated.
 * @returns The result of the action, or an error object if not authenticated.
 */
export async function withAuth<T>(
  action: (userId: string) => Promise<T>
): Promise<T | { success: false; error: string; data?: never; meta?: never }> {
  const { userId } = await auth()
  
  if (!userId) {
    return { success: false, error: 'Unauthorized' }
  }
  
  return action(userId)
}
