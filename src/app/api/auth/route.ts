import { NextRequest, NextResponse } from "next/server"
import { SignJWT } from "jose"

const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET ?? "fallback-secret")

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
    }

    const token = await new SignJWT({ admin: true })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret)

    const res = NextResponse.json({ ok: true })
    res.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 horas
      path: "/",
    })

    return res
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
