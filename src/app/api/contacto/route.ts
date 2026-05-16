import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const { nombre, email, asunto, mensaje } = await req.json()

    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const destino = process.env.CONTACT_EMAIL

    if (!apiKey || !destino) {
      return NextResponse.json({ error: "Contacto no configurado" }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: "Escuela de Capacitación <onboarding@resend.dev>",
      to: destino,
      replyTo: email,
      subject: `[Contacto Web] ${asunto}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316; border-bottom: 2px solid #fed7aa; padding-bottom: 8px;">
            Nueva consulta desde el sitio web
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 6px 0; color: #64748b; width: 100px;"><strong>Nombre:</strong></td>
              <td style="padding: 6px 0; color: #1e293b;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;"><strong>Email:</strong></td>
              <td style="padding: 6px 0; color: #1e293b;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;"><strong>Asunto:</strong></td>
              <td style="padding: 6px 0; color: #1e293b;">${asunto}</td>
            </tr>
          </table>
          <div style="background: #f8fafc; border-left: 4px solid #f97316; padding: 16px; border-radius: 4px; margin-top: 16px;">
            <p style="color: #64748b; font-size: 12px; margin: 0 0 8px;">Mensaje:</p>
            <p style="color: #1e293b; white-space: pre-wrap; margin: 0;">${mensaje}</p>
          </div>
          <p style="color: #94a3b8; font-size: 11px; margin-top: 24px;">
            Podés responder directamente a este email para contactar a ${nombre}.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Error enviando email:", err)
    return NextResponse.json({ error: "Error al enviar" }, { status: 500 })
  }
}
