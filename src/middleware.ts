import { NextResponse } from "next/server";

export async function middleware() {
  return NextResponse.next();
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/(nb|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
