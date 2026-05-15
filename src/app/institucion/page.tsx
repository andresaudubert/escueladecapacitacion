export default function InstitucionPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-1">Escuela de Capacitación</p>
        <h1 className="text-3xl font-black text-gray-900">Institución</h1>
        <p className="text-sm text-gray-500 mt-1">Conocé la estructura y quiénes forman parte de la Escuela</p>
      </div>

      {/* Autoridades */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Autoridades</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { cargo: "Director de la Escuela",       nombre: "[Nombre — próximamente]" },
            { cargo: "Subdirector",                  nombre: "[Nombre — próximamente]" },
            { cargo: "Secretario Académico",         nombre: "[Nombre — próximamente]" },
          ].map((a) => (
            <div key={a.cargo} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xl mb-3">
                👤
              </div>
              <p className="text-xs font-bold text-red-600 uppercase tracking-wide">{a.cargo}</p>
              <p className="text-sm font-semibold text-gray-800 mt-1">{a.nombre}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coordinadores */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Coordinadores de Departamento</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { depto: "Departamento Académico",       coord: "[Coordinador — próximamente]" },
            { depto: "Departamento de Evaluación",   coord: "[Coordinador — próximamente]" },
            { depto: "Departamento de Extensión",    coord: "[Coordinador — próximamente]" },
            { depto: "Departamento Administrativo",  coord: "[Coordinador — próximamente]" },
          ].map((d) => (
            <div key={d.depto} className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 text-lg shrink-0">
                🏢
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{d.depto}</p>
                <p className="text-xs text-gray-500 mt-0.5">{d.coord}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nota de actualización */}
      <p className="text-xs text-gray-400 text-center">
        Los datos institucionales serán actualizados próximamente.
      </p>
    </div>
  )
}
