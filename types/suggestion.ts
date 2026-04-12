import type { SuggestionStatus } from '@/prisma/generated/client'

// ============================================================================
// Suggestion Types
// ============================================================================

/** Suggestion row used in admin SuggestionsTable */
export type SuggestionRow = {
  id: string
  orgName: string
  category: string
  location: string
  description: string
  url: string
  status: SuggestionStatus
  adminNotes: string | null
  createdAt: string | Date
  reviewedAt: string | Date | null
}

/** State machine for suggestion dialog submit button */
export type SubmitState = 'idle' | 'loading' | 'success' | 'error'
