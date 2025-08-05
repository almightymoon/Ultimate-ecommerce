import { NextResponse } from 'next/server';

export function middleware(request) {
  // For now, let's disable the middleware to test the client-side auth
  // We'll rely on the AdminAuth component for authentication
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 