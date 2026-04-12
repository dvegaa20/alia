import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const ALLOWED_EMAILS = process.env.ALLOWED_EMAILS?.split(',') || []
const isProtectedRoute = createRouteMatcher(['/admin(.*)'])
const isSignInRoute = createRouteMatcher(['/admin/sign-in(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Skip authentication check for sign-in route (prevents redirect loop)
  if (isSignInRoute(req)) {
    return NextResponse.next()
  }

  // Only check auth for admin routes
  if (isProtectedRoute(req)) {
    const { userId, sessionId } = await auth()

    // Require authentication
    if (!userId) {
      return NextResponse.redirect(new URL('/admin/sign-in', req.url))
    }

    // Get user's email from Clerk
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const email = user.primaryEmailAddress?.emailAddress

    // Verify email allowlist
    if (!email || !ALLOWED_EMAILS.includes(email)) {
      // Revoke the active session so the user is signed out
      if (sessionId) {
        try {
          await client.sessions.revokeSession(sessionId)
        } catch (error) {
          console.error('Failed to revoke session:', error)
        }
      }

      const response = NextResponse.redirect(new URL('/unauthorized', req.url))
      // Explicitly clear cookies to ensure the frontend forgets the login state
      response.cookies.delete('__session')
      response.cookies.delete('__client_uat')
      return response
    }
  }

  // Public routes pass through without Clerk
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Only run middleware on admin routes
    '/admin/:path*',
  ],
}
