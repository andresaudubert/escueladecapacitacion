"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"

type Recurso = {
  id: string
  titulo: string
  descripcion: string | null
  categoria: string
  tipo: "PDF" | "EXCEL" | "LINK"
  url: string
  createdAt: string
}

const CATEGORIAS = ["Manuales de niveles", "Reglamentaciones", "Planillas útiles", "Contenido de especialidades", "Miscelánea"]

export default function AdminBibliotecaPage() {
  const router = useRouter()
  const [recursos, setRecursos] = useState<Recurso[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    categoria: "Recursos",
    tipo: "LINK" as "PDF" | "EXCEL" | "LINK",
    url: "",
  })
  const [file, setFile] = useState<File | null>(null)

  async function fetchRecursos() {
    try {
      const res = await fetch("/api/biblioteca")
      if (res.status === 401) { router.push("/admin/login"); return }
      const data = await res.json()
      setRecursos(data)
    } catch {
      setError("Error al cargar los recursos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRecursos() }, [])

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSubmitting(true)

    try {
      let url = form.url
      let publicId: string | undefined

      // Si es PDF, subir primero a Cloudinary
      if ((form.tipo === "PDF" || form.tipo === "EXCEL") && file) {
        const fd = new FormData()
        fd.append("file", file)
        const uploadRes = await fetch("/api/biblioteca/upload", { method: "POST", body: fd })
        if (!uploadRes.ok) throw new Error("Error al subir el archivo")
        const uploadData = await uploadRes.json()
        url = uploadData.url
        publicId = uploadData.publicId
      }

      const res = await fetch("/api/biblioteca", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, url, publicId }),
      })

      if (!res.ok) throw new Error("Error al guardar el recurso")

      setForm({ titulo: "", descripcion: "", categoria: "Recursos", tipo: "LINK", url: "" })
      setFile(null)
      if (fileRef.current) fileRef.current.value = ""
      setShowForm(false)
      fetchRecursos()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error inesperado")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    setDeleteId(id)
    try {
      const res = await fetch(`/api/biblioteca?id=${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Error al eliminar")
      setRecursos((prev) => prev.filter((r) => r.id !== id))
    } catch {
      setError("No se pudo eliminar el recurso")
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-1">Administración</p>
          <h1 className="text-3xl font-black text-gray-900">Biblioteca</h1>
          <p className="text-sm text-gray-500 mt-1">Gestión de materiales y recursos</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setShowForm(!showForm); setError("") }}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
          >
            {showForm ? "✕ Cancelar" : "+ Agregar recurso"}
          </button>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-3 py-2"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* Formulario nuevo recurso */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-gray-800">Nuevo recurso</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Título *</label>
              <input
                required
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                placeholder="Ej: Reglamento General 2024"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Categoría *</label>
              <select
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Descripción</label>
            <textarea
              rows={2}
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              placeholder="Breve descripción del recurso (opcional)"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-2">Tipo *</label>
            <div className="flex gap-3">
              {(["LINK", "PDF", "EXCEL"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setForm({ ...form, tipo: t, url: "" }); setFile(null) }}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                    form.tipo === t
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                  }`}
                >
                  {t === "PDF" ? "📄 PDF" : t === "EXCEL" ? "📊 Excel" : "🔗 Link externo"}
                </button>
              ))}
            </div>
          </div>

          {form.tipo === "LINK" ? (
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">URL *</label>
              <input
                required
                type="url"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          ) : form.tipo === "PDF" ? (
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Archivo PDF *</label>
              <input
                ref={fileRef}
                required
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white file:mr-3 file:bg-red-50 file:text-red-700 file:border-0 file:rounded-lg file:px-3 file:py-1 file:text-xs file:font-bold"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Archivo Excel *</label>
              <input
                ref={fileRef}
                required
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white file:mr-3 file:bg-green-50 file:text-green-700 file:border-0 file:rounded-lg file:px-3 file:py-1 file:text-xs file:font-bold"
              />
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              {submitting ? "Guardando..." : "Guardar recurso"}
            </button>
          </div>
        </form>
      )}

      {/* Lista */}
      {loading ? (
        <div className="text-center py-20 text-gray-400 text-sm">Cargando...</div>
      ) : recursos.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-sm font-medium">No hay recursos todavía</p>
          <p className="text-xs mt-1">Usá el botón de arriba para agregar el primero</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recursos.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                r.tipo === "PDF" ? "bg-red-50" : r.tipo === "EXCEL" ? "bg-green-50" : "bg-blue-50"
              }`}>
                {r.tipo === "PDF" ? "📄" : r.tipo === "EXCEL" ? "📊" : "🔗"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-bold text-gray-800 truncate">{r.titulo}</p>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 shrink-0">
                    {r.tipo}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-600 shrink-0">
                    {r.categoria}
                  </span>
                </div>
                {r.descripcion && (
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{r.descripcion}</p>
                )}
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                    {r.url}
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-gray-400">
                  {new Date(r.createdAt).toLocaleDateString("es-AR")}
                </span>
                <button
                  onClick={() => handleDelete(r.id)}
                  disabled={deleteId === r.id}
                  className="text-xs text-red-500 hover:text-red-700 disabled:opacity-40 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                >
                  {deleteId === r.id ? "..." : "Eliminar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
