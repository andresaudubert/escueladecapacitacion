import Link from "next/link"

export default function InicioPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-red-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-200 mb-3">
            Federación de Bomberos Voluntarios de La Pampa
          </p>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            Escuela de Capacitación
          </h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto">
            Formamos a los bomberos voluntarios de La Pampa con excelencia, compromiso y vocación de servicio.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/campus"
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm"
            >
              Ingresar al Campus →
            </Link>
            <Link
              href="/biblioteca"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm border border-white/30"
            >
              Ver Biblioteca
            </Link>
          </div>
        </div>
      </section>

      {/* Misión · Visión · Valores */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="w-10 h-10 bg-red-100 text-red-700 rounded-xl flex items-center justify-center text-xl mb-4">
            🎯
          </div>
          <h2 className="text-base font-bold text-gray-800 mb-2">Misión</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            [Texto de misión — próximamente]
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="w-10 h-10 bg-red-100 text-red-700 rounded-xl flex items-center justify-center text-xl mb-4">
            🔭
          </div>
          <h2 className="text-base font-bold text-gray-800 mb-2">Visión</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            [Texto de visión — próximamente]
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="w-10 h-10 bg-red-100 text-red-700 rounded-xl flex items-center justify-center text-xl mb-4">
            ⭐
          </div>
          <h2 className="text-base font-bold text-gray-800 mb-2">Valores</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            [Texto de valores — próximamente]
          </p>
        </div>
      </section>

      {/* Acceso rápido */}
      <section className="bg-white border-t border-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4">
          <Link href="/institucion" className="group flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-sm transition-all">
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xl shrink-0">
              🏛️
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 group-hover:text-red-700 transition-colors">Institución</p>
              <p className="text-xs text-gray-400 mt-0.5">Autoridades y estructura</p>
            </div>
          </Link>
          <Link href="/biblioteca" className="group flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-sm transition-all">
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xl shrink-0">
              📚
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 group-hover:text-red-700 transition-colors">Biblioteca</p>
              <p className="text-xs text-gray-400 mt-0.5">Materiales y recursos</p>
            </div>
          </Link>
          <Link href="/campus" className="group flex items-center gap-4 p-5 rounded-xl border border-amber-200 bg-amber-50 hover:border-amber-400 hover:shadow-sm transition-all">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl shrink-0">
              🎓
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 group-hover:text-amber-700 transition-colors">Campus Virtual</p>
              <p className="text-xs text-gray-400 mt-0.5">Plataforma de evaluación</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
