'use client'

/**
 * Dark mode has been removed in favor of Alia's single editorial light system.
 * Kept as a no-op export so existing untouched admin imports compile cleanly.
 */
export function ModeToggle({ size }: { size?: string } = {}) {
  void size
  return null
}
