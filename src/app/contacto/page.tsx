"use client"

import { useState } from "react"

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("ok")
        setForm({ nombre: "", email: "", asunto: "", mensaje: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-12">

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1">Escuela de Capacitación</p>
          <h1 className="text-3xl font-black text-gray-900">Contacto</h1>
          <p className="text-sm text-gray-500 mt-1">
            Escribinos tus consultas, dudas o sugerencias. Te respondemos a la brevedad.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {status === "ok" ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-lg font-black text-gray-900 mb-2">¡Mensaje enviado!</h2>
              <p className="text-sm text-gray-500 mb-6">
                Recibimos tu consulta y te responderemos a la brevedad al email que indicaste.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-sm text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Nombre completo *</label>
                  <input
                    required
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    placeholder="Tu nombre"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="tu@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Asunto *</label>
                <input
                  required
                  value={form.asunto}
                  onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                  placeholder="¿Sobre qué nos escribís?"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Mensaje *</label>
                <textarea
                  required
                  rows={5}
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  placeholder="Escribí tu consulta o mensaje aquí..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  Hubo un error al enviar el mensaje. Por favor intentá de nuevo.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                {status === "loading" ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
