import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { isAdminAuthenticated } from "@/lib/auth"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 })
    }

    const TIPOS_PERMITIDOS = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ]
    if (!TIPOS_PERMITIDOS.includes(file.type)) {
      return NextResponse.json({ error: "Solo se aceptan archivos PDF o Excel" }, { status: 400 })
    }

    const MAX_SIZE = 20 * 1024 * 1024 // 20 MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "El archivo supera los 20 MB" }, { status: 400 })
    }

    const isExcel = file.type !== "application/pdf"
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "escuela-capacitacion",
            ...(isExcel ? {} : { format: "pdf" }),
            use_filename: true,
            unique_filename: true,
          },
          (error, result) => {
            if (error || !result) reject(error ?? new Error("Upload failed"))
            else resolve(result as { secure_url: string; public_id: string })
          }
        )
        uploadStream.end(buffer)
      }
    )

    return NextResponse.json({
      url:      result.secure_url,
      publicId: result.public_id,
    })
  } catch (err) {
    console.error("Cloudinary upload error:", err)
    return NextResponse.json({ error: "Error al subir el archivo" }, { status: 500 })
  }
}
