// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    
    // Check if trying to access sheet data
    if (path.startsWith('/api/sheets')) {
      const sheetName = req.nextUrl.searchParams.get('sheetName');
      
      if (!token?.role?.allowedSheets?.includes(sheetName)) {
        return NextResponse.json(
          { error: 'Unauthorized access to sheet' },
          { status: 403 }
        );
      }
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

export const config = {
  matcher: ['/api/sheets/:path*', '/dashboard/:path*']
};