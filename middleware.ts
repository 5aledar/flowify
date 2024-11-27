import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const publicRoutes = createRouteMatcher([
  '/sign-in',
  '/sign-up',
  '/'
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const currentUrl = new URL(req.url)
  const isLanding = currentUrl.pathname === '/'
  const apiRequest = currentUrl.pathname.startsWith('/api')

  if (userId && publicRoutes(req) && isLanding) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  if (!userId) {
    if (!publicRoutes(req)) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    if (apiRequest && !publicRoutes(req)) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  }
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
}