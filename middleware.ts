import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isProtectedPath = request.nextUrl.pathname.startsWith('/dashboard');
  const isAuthPath = request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/signup';

  // Redirect to dashboard if authenticated user tries to access auth pages
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect to signin if unauthenticated user tries to access protected routes
  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signup', '/dashboard/:path*']
};
