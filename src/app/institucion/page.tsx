export default function InstitucionPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-1">Escuela de Capacitación</p>
          <h1 className="text-3xl font-black text-gray-900">Institución</h1>
          <p className="text-sm text-gray-500 mt-1">Conocé la estructura y quiénes forman parte de la Escuela</p>
        </div>

        {/* Equipo de gestión */}
        <section>
          <h2 className="text-base font-black text-gray-800 mb-4 pb-2 border-b border-gray-200 uppercase tracking-wide">
            Equipo de Gestión
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { cargo: "Director",                      nombre: "Andrés Audubert" },
              { cargo: "Vicedirector",                  nombre: "Sebastián Pérez Campana" },
              { cargo: "Coordinadora de Departamentos", nombre: "Gabriela Paoli" },
            ].map((a) => (
              <div key={a.cargo} className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="w-11 h-11 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xl mb-3">
                  👤
                </div>
                <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">{a.cargo}</p>
                <p className="text-sm font-bold text-gray-800 mt-1">{a.nombre}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Coordinadoras Regionales */}
        <section>
          <h2 className="text-base font-black text-gray-800 mb-4 pb-2 border-b border-gray-200 uppercase tracking-wide">
            Coordinadoras Regionales
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { region: "Regional Sur",           nombre: "Daniela Marín" },
              { region: "Regional Norte y Oeste",  nombre: "Carla González" },
            ].map((r) => (
              <div key={r.region} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
                <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-xl shrink-0">
                  📍
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{r.region}</p>
                  <p className="text-sm font-bold text-gray-800 mt-0.5">{r.nombre}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nota */}
        <p className="text-xs text-gray-400 text-center pb-4">
          La estructura institucional será ampliada próximamente con los Departamentos de Especialidades y Escuelas Zonales.
        </p>
      </div>
    </div>
  )
}
