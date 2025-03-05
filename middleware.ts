import { NextResponse } from 'next/server';
import { auth } from "./app/lib/auth";

export async function middleware(request) {
  // Check if it's an edit blog post route
  const pathname = request.nextUrl.pathname;
  const isEditBlogRoute = pathname.startsWith('/blog/edit/');
  
  // Get the current user session
  const session = await auth();
  
  // For blog edit routes, ensure the user is authenticated
  if (isEditBlogRoute) {
    if (!session) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // We'll let the API handle the check for unpublished posts
    // as we can't easily access the database directly from middleware
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|opengraph-image|twitter-image).*)",
  ],
};
