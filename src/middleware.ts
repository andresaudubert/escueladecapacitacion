import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? "fallback-secret-change-in-production"
)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Proteger rutas /admin excepto /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = req.cookies.get("admin_session")?.value
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }
    try {
      await jwtVerify(token, SECRET)
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
