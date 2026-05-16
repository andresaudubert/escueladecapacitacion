import OrgChart from "./OrgChart"

export default function InstitucionPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1">Escuela de Capacitación</p>
          <h1 className="text-3xl font-black text-gray-900">Institución</h1>
          <p className="text-sm text-gray-500 mt-1">Estructura y equipo de la Escuela de Capacitación</p>
        </div>

        {/* Organigrama */}
        <section>
          <div className="mb-4">
            <h2 className="text-base font-black text-gray-800 uppercase tracking-wide">Organigrama</h2>
            <p className="text-xs text-gray-400 mt-0.5">Podés desplazarte horizontalmente para ver todos los departamentos</p>
          </div>
          <OrgChart />
        </section>

        {/* Nota */}
        <p className="text-xs text-gray-400 text-center pb-4">
          La estructura institucional se irá ampliando con nuevas incorporaciones.
        </p>
      </div>
    </div>
  )
}
