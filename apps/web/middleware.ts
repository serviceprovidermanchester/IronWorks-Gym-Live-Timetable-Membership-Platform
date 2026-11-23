import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value ||
                request.cookies.get('__Secure-next-auth.session-token')?.value;

  const { pathname } = request.nextUrl;

  const protectedMemberRoutes = ['/dashboard', '/bookings', '/profile', '/billing'];
  const isProtectedMember = protectedMemberRoutes.some((route) => pathname.startsWith(route));
  const isProtectedAdmin = pathname.startsWith('/admin');

  // If visiting member or admin route without token, redirect to login
  if ((isProtectedMember || isProtectedAdmin) && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/bookings/:path*',
    '/profile/:path*',
    '/billing/:path*',
    '/admin/:path*',
  ],
};
