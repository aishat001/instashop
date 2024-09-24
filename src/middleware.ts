import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/view-product']; 

export function middleware(request: NextRequest) {
  const isAuthenticated = Boolean(request.cookies.get('authToken')); 

  if (!isAuthenticated && protectedPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url)); 

  return NextResponse.next(); 
}
}