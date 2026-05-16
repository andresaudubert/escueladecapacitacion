import Link from "next/link"
import Image from "next/image"
import { IconMision, IconVision, IconValores } from "@/components/IconsMVV"

const CALENDAR_SRC =
  "https://calendar.google.com/calendar/embed?src=c4plcc4jjc0ne3fcjs61177fkg%40group.calendar.google.com&ctz=America%2FArgentina%2FBuenos_Aires&hl=es&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&mode=MONTH"

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
            <p className="text-base italic text-gray-600 max-w-xl border-l-4 border-orange-400 pl-4">
              "Ser bombero es voluntario, saber serlo es obligatorio."
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
