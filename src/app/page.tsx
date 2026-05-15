import Link from "next/link"

const CALENDAR_SRC =
  "https://calendar.google.com/calendar/embed?src=c4plcc4jjc0ne3fcjs61177fkg%40group.calendar.google.com&ctz=America%2FArgentina%2FBuenos_Aires&hl=es&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&mode=MONTH"

export default function InicioPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero limpio */}
      <section className="bg-white border-b border-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600">
            Federación de Bomberos Voluntarios de La Pampa
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
            Escuela de Capacitación
          </h1>
          <p className="text-sm text-gray-500 max-w-xl">
            Formamos a los bomberos voluntarios de La Pampa con excelencia, compromiso y vocación de servicio.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/campus"
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              Ingresar al Campus →
            </Link>
            <Link
              href="/biblioteca"
              className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              Ver Biblioteca
            </Link>
          </div>
        </div>
      </section>

      {/* Calendario — elemento principal */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-4">
          <h2 className="text-lg font-black text-gray-900">Calendario de actividades</h2>
          <p className="text-sm text-gray-500 mt-0.5">Cursos, exámenes y eventos de la Escuela de Capacitación</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <iframe
            src={CALENDAR_SRC}
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            title="Calendario de actividades"
            className="w-full"
          />
        </div>
      </section>

      {/* Misión · Visión · Valores */}
      <section className="max-w-6xl mx-auto px-4 pb-12 grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="w-9 h-9 bg-red-100 text-red-700 rounded-xl flex items-center justify-center text-lg mb-4">
            🔭
          </div>
          <h2 className="text-sm font-black text-gray-900 mb-2 uppercase tracking-wide">Visión</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Consolidarnos como la principal referente de excelencia en capacitación para las asociaciones de nuestra Federación y la comunidad, creando, gestionando y ofreciendo programas formativos de vanguardia que potencien el desarrollo profesional de sus destinatarios.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="w-9 h-9 bg-red-100 text-red-700 rounded-xl flex items-center justify-center text-lg mb-4">
            🎯
          </div>
          <h2 className="text-sm font-black text-gray-900 mb-2 uppercase tracking-wide">Misión</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Fomentar una cultura de aprendizaje colaborativo y compartido entre los conocimientos individuales dentro de las asociaciones con el resto del sistema provincial, como así también aportar y recibir conocimiento de la Academia Nacional de Bomberos. Promover activamente la capacitación continua en todas las asociaciones, investigando nuevas modalidades y metodologías, creando y gestionando programas formativos en todos sus niveles.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="w-9 h-9 bg-red-100 text-red-700 rounded-xl flex items-center justify-center text-lg mb-4">
            ⭐
          </div>
          <h2 className="text-sm font-black text-gray-900 mb-2 uppercase tracking-wide">Valores</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <span className="font-semibold text-gray-800">Vocación y Compromiso:</span>{" "}
              Dedicación plena al desarrollo de capacidades y habilidades, fomentando el crecimiento profesional y personal de nuestros miembros.
            </li>
            <li>
              <span className="font-semibold text-gray-800">Ética, Respeto y Honestidad:</span>{" "}
              Guiar acciones con los más altos estándares éticos, mostrando respeto por los participantes, instructores y asociaciones.
            </li>
            <li>
              <span className="font-semibold text-gray-800">Responsabilidad y Profesionalismo:</span>{" "}
              Cumplir las responsabilidades de manera eficiente y transparente, manteniendo un alto nivel de profesionalismo en todas las actividades.
            </li>
          </ul>
        </div>
      </section>

      {/* Acceso rápido */}
      <section className="bg-white border-t border-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-4">
          <Link href="/institucion" className="group flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-red-200 hover:shadow-sm transition-all bg-white">
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xl shrink-0">
              🏛️
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 group-hover:text-red-700 transition-colors">Institución</p>
              <p className="text-xs text-gray-400 mt-0.5">Autoridades y estructura</p>
            </div>
          </Link>
          <Link href="/biblioteca" className="group flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-red-200 hover:shadow-sm transition-all bg-white">
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
