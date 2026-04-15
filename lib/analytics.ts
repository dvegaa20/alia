/**
 * Client-side GA4 event tracking utilities for Alia.
 *
 * Uses the `gtag` instance already loaded by `@next/third-parties/google`
 * in the root layout — zero additional dependencies, zero cost.
 */

// Extend window so TypeScript knows about gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      params?: Record<string, string | number | boolean>
    ) => void
  }
}

// ─── Core Tracker ─────────────────────────────────────────────────────────────

/**
 * Track a social engagement event in GA4.
 *
 * These events are counted as "Conexiones Reales" on the /impacto dashboard.
 * The `action` parameter becomes the event discriminator in GA4 reports.
 *
 * @example
 * trackSocialLead('click_website', 'Fundación Vida Verde')
 * trackSocialLead('view_profile', org.name)
 * trackSocialLead('suggest_org', data.orgName)
 */
export function trackSocialLead(action: string, orgName: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', 'social_lead', {
    action,
    org_name: orgName,
  })
}
