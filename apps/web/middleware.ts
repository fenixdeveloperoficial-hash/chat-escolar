import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rolePermissions: Record<string, string[]> = {
  '/dashboard/settings': ['owner', 'manager'],
  '/dashboard': ['owner', 'manager'],
  '/app': ['seller', 'manager', 'owner']
};

function allowedRole(pathname: string): string[] | null {
  for (const [prefix, roles] of Object.entries(rolePermissions)) {
    if (pathname.startsWith(prefix)) return roles;
  }
  return null;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requiredRoles = allowedRole(pathname);

  if (!requiredRoles) return NextResponse.next();

  const role = request.cookies.get('vf_role')?.value;
  if (!role || !requiredRoles.includes(role)) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const response = NextResponse.next();
  response.cookies.set('csrf_protection', 'strict', {
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    path: '/'
  });
  return response;
}

export const config = {
  matcher: ['/app/:path*', '/dashboard/:path*']
};
