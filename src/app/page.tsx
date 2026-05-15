import Link from "next/link"
import Image from "next/image"

const CALENDAR_SRC =
  "https://calendar.google.com/calendar/embed?src=c4plcc4jjc0ne3fcjs61177fkg%40group.calendar.google.com&ctz=America%2FArgentina%2FBuenos_Aires&hl=es&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&mode=MONTH"

function IconMision() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
      <path d="M32 8 L14 48 H50 Z" stroke="#f97316" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M22 48 L10 48" stroke="#f97316" strokeWidth="3" strokeLinecap="round"/>
      <path d="M42 48 L54 48" stroke="#f97316" strokeWidth="3" strokeLinecap="round"/>
      {/* Bandera */}
      <line x1="32" y1="8" x2="32" y2="2" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 2 L40 5 L32 8" fill="#f97316"/>
    </svg>
  )
}

function IconVision() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
      {/* Bombilla */}
      <path d="M32 10 C22 10 16 17 16 25 C16 31 19 36 24 39 L24 46 L40 46 L40 39 C45 36 48 31 48 25 C48 17 42 10 32 10Z"
        stroke="#f97316" strokeWidth="3" strokeLinejoin="round"/>
      {/* Líneas base */}
      <line x1="26" y1="49" x2="38" y2="49" stroke="#f97316" strokeWidth="3" strokeLinecap="round"/>
      <line x1="28" y1="53" x2="36" y2="53" stroke="#f97316" strokeWidth="3" strokeLinecap="round"/>
      {/* Rayos internos */}
      <line x1="32" y1="17" x2="32" y2="23" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
      <line x1="25" y1="24" x2="39" y2="24" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function IconValores() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
      {/* Mano izquierda */}
      <path d="M14 54 C14 54 8 46 8 36 C8 30 12 26 16 26 C18 26 20 27 21 29"
        stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Mano derecha */}
      <path d="M50 54 C50 54 56 46 56 36 C56 30 52 26 48 26 C46 26 44 27 43 29"
        stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Brazos */}
      <path d="M14 54 L26 46" stroke="#f97316" strokeWidth="3" strokeLinecap="round"/>
      <path d="M50 54 L38 46" stroke="#f97316" strokeWidth="3" strokeLinecap="round"/>
      {/* Corazón */}
      <path d="M32 42 C32 42 20 34 20 26 C20 21 24 18 28 19 C30 19.5 31.5 21 32 22 C32.5 21 34 19.5 36 19 C40 18 44 21 44 26 C44 34 32 42 32 42Z"
        stroke="#f97316" strokeWidth="3" strokeLinejoin="round"/>
    </svg>
  )
}

export default function InicioPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero con escudo prominente */}
      <section className="bg-white border-b border-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Escudo */}
          <div className="shrink-0 flex justify-center">
            <Image
              src="/escudo-federacion.png"
              alt="Escudo Escuela de Capacitación"
              width={160}
              height={160}
              className="drop-shadow-md"
              priority
            />
          </div>
          {/* Texto */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Federación de Bomberos Voluntarios de La Pampa
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Escuela de Capacitación
            </h1>
            <p className="text-sm text-gray-500 max-w-xl">
              Formamos a los bomberos voluntarios de La Pampa con excelencia, compromiso y vocación de servicio.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-1">
              <Link
                href="/campus"
                className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm"
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
        </div>
      </section>

      {/* Calendario */}
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
      <section className="max-w-6xl mx-auto px-4 pb-14 grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col items-center text-center">
          <IconMision />
          <h2 className="text-sm font-black text-gray-900 mt-4 mb-3 uppercase tracking-widest">Misión</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Fomentar una cultura de aprendizaje colaborativo y compartido entre los conocimientos individuales dentro de las asociaciones con el resto del sistema provincial, como así también aportar y recibir conocimiento de la Academia Nacional de Bomberos. Promover activamente la capacitación continua en todas las asociaciones, investigando nuevas modalidades y metodologías.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col items-center text-center">
          <IconVision />
          <h2 className="text-sm font-black text-gray-900 mt-4 mb-3 uppercase tracking-widest">Visión</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Consolidarnos como la principal referente de excelencia en capacitación para las asociaciones de nuestra Federación y la comunidad, creando, gestionando y ofreciendo programas formativos de vanguardia que potencien el desarrollo profesional de sus destinatarios.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col items-center text-center">
          <IconValores />
          <h2 className="text-sm font-black text-gray-900 mt-4 mb-3 uppercase tracking-widest">Valores</h2>
          <ul className="space-y-2 text-sm text-gray-600 text-left">
            <li><span className="font-semibold text-gray-800">Vocación y Compromiso:</span> Dedicación plena al desarrollo de capacidades y habilidades.</li>
            <li><span className="font-semibold text-gray-800">Ética, Respeto y Honestidad:</span> Acciones guiadas por los más altos estándares éticos.</li>
            <li><span className="font-semibold text-gray-800">Responsabilidad y Profesionalismo:</span> Eficiencia, transparencia y alto nivel en todas las actividades.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
