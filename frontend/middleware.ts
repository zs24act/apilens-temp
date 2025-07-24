import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // If trying to access auth pages with a token, redirect to dashboard
  if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If trying to access protected pages without a token, redirect to login
  if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/profile') || pathname.startsWith('/apis'))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/apis/:path*', '/login', '/register'],
};
