import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const sessionCookie = request.cookies.get("admin_session")?.value;
  const parsedSession = sessionCookie ? await decrypt(sessionCookie) : null;

  if (path.startsWith("/admin") && !parsedSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path === "/login" && parsedSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  const response = NextResponse.next();
  if (parsedSession) {
    response.headers.set("x-user-id", parsedSession.userId as string);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
