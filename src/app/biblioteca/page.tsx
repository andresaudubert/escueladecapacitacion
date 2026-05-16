import { prisma } from "@/lib/prisma"

const CATEGORIAS = ["Todos", "Manuales de niveles", "Reglamentaciones", "Planillas útiles", "Contenido de especialidades", "Miscelánea"]

export const revalidate = 60

export default async function BibliotecaPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; q?: string }>
}) {
  const { categoria, q } = await searchParams
  const catFilter = categoria && categoria !== "Todos" ? categoria : undefined
  const search    = q?.trim() || undefined

  const recursos = await prisma.recurso.findMany({
    where: {
      ...(catFilter ? { categoria: catFilter } : {}),
      ...(search
        ? {
            OR: [
              { titulo:      { contains: search, mode: "insensitive" } },
              { descripcion: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-1">Escuela de Capacitación</p>
        <h1 className="text-3xl font-black text-gray-900">Biblioteca</h1>
        <p className="text-sm text-gray-500 mt-1">Materiales, reglamentos y recursos para la formación</p>
      </div>

      {/* Filtros */}
      <form method="GET" className="flex flex-col sm:flex-row gap-3">
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Buscar por título..."
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
        />
        <select
          name="categoria"
          defaultValue={categoria ?? "Todos"}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
        >
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
        >
          Buscar
        </button>
      </form>

      {/* Resultados */}
      {recursos.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-sm font-medium">No hay recursos disponibles todavía</p>
          <p className="text-xs mt-1">Los materiales se irán sumando próximamente</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {recursos.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-red-300 hover:shadow-sm transition-all flex items-start gap-4"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                r.tipo === "PDF" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
              }`}>
                {r.tipo === "PDF" ? "📄" : "🔗"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold text-gray-800 group-hover:text-red-700 transition-colors leading-snug">
                    {r.titulo}
                  </p>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 shrink-0">
                    {r.tipo}
                  </span>
                </div>
                {r.descripcion && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{r.descripcion}</p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  <span className="font-medium text-gray-500">{r.categoria}</span>
                  {" · "}
                  {new Date(r.createdAt).toLocaleDateString("es-AR")}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
