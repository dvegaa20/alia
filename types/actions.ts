import type { PaginationMeta } from './admin'

// ============================================================================
// Server Action Types
// ============================================================================

/** Prisma transaction client type — extracted from prisma.$transaction callback */
export type TxClient = Parameters<
  Parameters<typeof import('@/lib/prisma').default.$transaction>[0]
>[0]

/** Generic result type for all server actions */
export type ActionResult<T = undefined> = T extends undefined
  ? { success: boolean; error?: string }
  : { success: boolean; data?: T; error?: string; meta?: PaginationMeta }
