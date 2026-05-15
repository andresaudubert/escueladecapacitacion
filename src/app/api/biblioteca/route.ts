import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { isAdminAuthenticated } from "@/lib/auth"
import { v2 as cloudinary } from "cloudinary"

// GET — público, devuelve todos los recursos
export async function GET() {
  try {
    const recursos = await prisma.recurso.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(recursos)
  } catch {
    return NextResponse.json({ error: "Error al obtener recursos" }, { status: 500 })
  }
}

// POST — admin, crea un recurso
export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { titulo, descripcion, categoria, tipo, url, publicId } = body

    if (!titulo || !categoria || !tipo || !url) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    const recurso = await prisma.recurso.create({
      data: {
        titulo: titulo.trim(),
        descripcion: descripcion?.trim() || null,
        categoria,
        tipo,
        url,
        publicId: publicId ?? null,
      },
    })

    return NextResponse.json(recurso, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Error al crear recurso" }, { status: 500 })
  }
}

// DELETE — admin, elimina un recurso y su archivo en Cloudinary si existe
export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 })
    }

    const recurso = await prisma.recurso.findUnique({ where: { id } })
    if (!recurso) {
      return NextResponse.json({ error: "Recurso no encontrado" }, { status: 404 })
    }

    // Si tiene publicId de Cloudinary, eliminar el archivo
    if (recurso.publicId) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key:    process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      })
      await cloudinary.uploader.destroy(recurso.publicId, { resource_type: "raw" })
    }

    await prisma.recurso.delete({ where: { id } })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Error al eliminar recurso" }, { status: 500 })
  }
}
