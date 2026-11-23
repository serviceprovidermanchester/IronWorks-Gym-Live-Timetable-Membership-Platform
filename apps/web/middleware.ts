import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Support both Auth.js v5 and legacy NextAuth cookie names
  const token =
    request.cookies.get('authjs.session-token')?.value ||
    request.cookies.get('__Secure-authjs.session-token')?.value ||
    request.cookies.get('next-auth.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value;

  const { pathname } = request.nextUrl;

  const protectedMemberRoutes = ['/dashboard', '/bookings', '/profile', '/billing'];
  const isProtectedMember = protectedMemberRoutes.some((route) => pathname.startsWith(route));
  const isProtectedAdmin = pathname.startsWith('/admin');

  // If visiting protected route without token, redirect to login
  if ((isProtectedMember || isProtectedAdmin) && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already authenticated and visiting /login or /register, redirect to dashboard
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
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
    '/login',
    '/register',
  ],
};
