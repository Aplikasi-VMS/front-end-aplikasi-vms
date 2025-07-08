import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

const PATH_CONFIG = {
  public: [
    '/',
  ],
  guestOnly: [
    '/login',
  ],
  roleBased: {
    '/dashboard/users': ['SUPERUSER'],
    '/dashboard/devices': ['SUPERUSER', 'ADMIN'],
    '/dashboard/visitors': ['SUPERUSER', 'RECEPTIONIST'],
    '/dashboard/': ['SUPERUSER', 'ADMIN', 'RECEPTIONIST'],
  },
};

const isPublicPath = (pathname) => {
  return PATH_CONFIG.public.some(path => pathname === path || pathname.startsWith(path + '/'));
};

const isGuestOnlyPath = (pathname) => {
  return PATH_CONFIG.guestOnly.some(path => pathname === path || pathname.startsWith(path + '/'));
};

const getRequiredRoles = (pathname) => {
  for (const [path, roles] of Object.entries(PATH_CONFIG.roleBased)) {
    if (pathname.startsWith(path)) {
      return roles;
    }
  }
  return null;
};

const handleUnauthorized = (req, message = 'Unauthorized') => {
  const url = new URL('/login', req.url);
  url.searchParams.set('redirect', req.nextUrl.pathname);

  const response = NextResponse.redirect(url);
  response.cookies.delete('token');

  console.warn(`[Auth] ${message}`);
  return response;
};

export async function middleware(req) {
  console.log("middleware dijalankan");
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  // Guest-only pages: jika sudah login, redirect ke dashboard
  if (isGuestOnlyPath(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // Public pages: boleh diakses siapa saja
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Protected pages
  if (!token) {
    return handleUnauthorized(req, 'No token found');
  }

  try {
    const { payload } = await jwtVerify(token, encodedSecret);

    if (!payload?.role) {
      return handleUnauthorized(req, 'Invalid token payload');
    }

    const requiredRoles = getRequiredRoles(pathname);

    if (requiredRoles) {
      const hasAccess = requiredRoles.includes('*') || requiredRoles.includes(payload.role);

      if (!hasAccess) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    const response = NextResponse.next();
    response.headers.set('x-user-role', payload.role);

    return response;

  } catch (error) {
    if (error.code === 'ERR_JWT_EXPIRED') {
      return handleUnauthorized(req, 'Token expired');
    }

    if (error.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
      return handleUnauthorized(req, 'Invalid token signature');
    }

    console.error('Authentication error:', error);
    return handleUnauthorized(req, 'Authentication failed');
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|assets|sw.js|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|css|js)$).*)'
  ]
};
