"use client"

import { useState } from "react"
import OrgChart from "./OrgChart"
import { IconMision, IconVision, IconValores } from "@/components/IconsMVV"

const TABS = [
  { id: "mvv",          label: "Misión, Visión y Valores" },
  { id: "organigrama",  label: "Organigrama" },
  { id: "historia",     label: "Historia" },
  { id: "federacion",   label: "La Federación" },
]

function TabMVV() {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col items-center text-center">
        <IconMision />
        <h3 className="text-sm font-black text-gray-900 mt-4 mb-3 uppercase tracking-widest">Misión</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Fomentar una cultura de aprendizaje colaborativo y compartido entre los conocimientos individuales dentro de las asociaciones con el resto del sistema provincial, como así también aportar y recibir conocimiento de la Academia Nacional de Bomberos. Promover activamente la capacitación continua en todas las asociaciones, investigando nuevas modalidades y metodologías.
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col items-center text-center">
        <IconVision />
        <h3 className="text-sm font-black text-gray-900 mt-4 mb-3 uppercase tracking-widest">Visión</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Consolidarnos como la principal referente de excelencia en capacitación para las asociaciones de nuestra Federación y la comunidad, creando, gestionando y ofreciendo programas formativos de vanguardia que potencien el desarrollo profesional de sus destinatarios.
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col items-center text-center">
        <IconValores />
        <h3 className="text-sm font-black text-gray-900 mt-4 mb-3 uppercase tracking-widest">Valores</h3>
        <ul className="space-y-3 text-sm text-gray-600 text-left">
          <li><span className="font-semibold text-gray-800">Vocación y Compromiso:</span> Dedicación plena al desarrollo de capacidades y habilidades.</li>
          <li><span className="font-semibold text-gray-800">Ética, Respeto y Honestidad:</span> Acciones guiadas por los más altos estándares éticos.</li>
          <li><span className="font-semibold text-gray-800">Responsabilidad y Profesionalismo:</span> Eficiencia, transparencia y alto nivel en todas las actividades.</li>
        </ul>
      </div>
    </div>
  )
}

function TabOrganigrama() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-400">
        El equipo de la Escuela trabaja de forma colaborativa. Las líneas muestran vínculos de coordinación, no de mando.
      </p>
      <OrgChart />
    </div>
  )
}

function TabHistoria() {
  return (
    <div className="max-w-3xl space-y-5">

      {/* Intro */}
      <div className="bg-white rounded-2xl border border-gray-200 p-7">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl shrink-0">📖</div>
          <h3 className="text-base font-black text-gray-900 uppercase tracking-wide">Historia de la Escuela</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          La Escuela de Capacitación no nació de un día para otro: fue el resultado de un proceso gradual
          que comenzó mucho antes de que existiera una estructura formal. Su historia refleja el mismo espíritu
          que define al bombero voluntario — la iniciativa, la colaboración y el compromiso con la formación continua.
        </p>
      </div>

      {/* Línea de tiempo */}
      <div className="bg-white rounded-2xl border border-gray-200 p-7">
        <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Línea de tiempo</h4>

        <div className="space-y-0">

          {/* Hito 1 */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-orange-400 shrink-0 mt-1" />
              <div className="w-px flex-1 bg-orange-100 mt-1" />
            </div>
            <div className="pb-7">
              <p className="text-xs font-black text-orange-600 uppercase tracking-widest mb-1">1994 — Los primeros pasos</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Con la conformación de la Federación Pampeana, cada cuartel capacitaba y aprobaba a sus propios bomberos
                de manera independiente. Sin embargo, rápidamente surgió la inquietud de compartir experiencias: los jefes
                de cuerpo comenzaron a ponerse de acuerdo para realizar prácticas conjuntas entre cuarteles y transmitirse
                novedades en materia de capacitación, aún sin ninguna estructura formal que los respaldara.
              </p>
            </div>
          </div>

          {/* Hito 2 */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-orange-400 shrink-0 mt-1" />
              <div className="w-px flex-1 bg-orange-100 mt-1" />
            </div>
            <div className="pb-7">
              <p className="text-xs font-black text-orange-600 uppercase tracking-widest mb-1">15 de junio de 2002 — Creación oficial</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Por acta de la Comisión Directiva de la Federación quedó establecida formalmente la
                <strong className="text-gray-800"> Escuela Provincial de Capacitación</strong>, dando origen a la estructura que existe hoy.
                A partir de ese momento se comenzó a uniformar los criterios de formación del bombero voluntario
                en toda la provincia: se organizaron prácticas conjuntas con metodología común y se elaboraron
                los primeros manuales básicos para que todos los aspirantes pampeanos accedieran a los mismos contenidos,
                independientemente de su localidad.
              </p>
            </div>
          </div>

          {/* Hito 3 */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-orange-400 shrink-0 mt-1" />
              <div className="w-px flex-1 bg-orange-100 mt-1" />
            </div>
            <div className="pb-7">
              <p className="text-xs font-black text-orange-600 uppercase tracking-widest mb-1">Consolidación — Escuelas zonales y especialidades</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Con el crecimiento del sistema, la Escuela se estructuró en <strong className="text-gray-800">escuelas zonales</strong> distribuidas
                en las seis zonas operativas de la provincia, acercando la capacitación a cada región. En paralelo, se
                conformaron los <strong className="text-gray-800">departamentos de especialidades</strong> — Fuego, Socorrismo, Rescate Vehicular,
                Materiales Peligrosos, entre otros — permitiendo una formación más profunda y específica para quienes
                se dedicaban a cada área. Los manuales también fueron actualizados y enriquecidos para reflejar
                los nuevos estándares técnicos y operativos.
              </p>
            </div>
          </div>

          {/* Hito 4 */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 shrink-0 mt-1" />
            </div>
            <div className="pb-2">
              <p className="text-xs font-black text-orange-600 uppercase tracking-widest mb-1">Presente — Educación técnico profesional</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                El paso más reciente y significativo en la historia de la Escuela fue la incorporación de la formación
                bomberil al sistema de <strong className="text-gray-800">educación técnico profesional</strong> formal, a través de la carrera de
                Bombero Nivel Uno. Esta iniciativa representa un salto cualitativo: la capacitación deja de ser
                exclusivamente interna para convertirse en una formación con reconocimiento oficial, obligatoria
                para todos los ingresantes a los cuerpos de bomberos voluntarios de la provincia.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

function TabFederacion() {
  return (
    <div className="space-y-5 max-w-4xl">

      {/* Intro */}
      <div className="bg-white rounded-2xl border border-gray-200 p-7">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl shrink-0">🤝</div>
          <h3 className="text-base font-black text-gray-900 uppercase tracking-wide">La Federación</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          La <strong className="text-gray-800">Federación de Asociaciones de Cuerpos de Bomberos Voluntarios de la Provincia de La Pampa</strong> —
          conocida como la <em>Federación Pampeana</em> — es el organismo de segundo grado que nuclea, representa y coordina
          a todos los cuerpos de bomberos voluntarios de la provincia. Fue fundada el <strong className="text-gray-800">25 de noviembre de 1994</strong> en
          General Pico, con la participación de los cuarteles de General Pico, Quemú Quemú, Toay y Victorica,
          quienes conformaron su primera Comisión Directiva.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mt-3">
          Hoy la Federación integra a <strong className="text-gray-800">más de 38 asociaciones</strong> distribuidas a lo largo del territorio
          pampeano, desde General Pico hasta La Adela, desde Algarrobo del Águila hasta Jacinto Arauz. La primera
          asociación en formarse fue la de General Pico, el 3 de diciembre de 1961, que abrió el camino para que
          localidades de toda la provincia conformaran sus propios cuerpos.
        </p>
      </div>

      {/* Propósitos */}
      <div className="bg-white rounded-2xl border border-gray-200 p-7">
        <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Finalidad institucional</h4>
        <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
          <li className="flex gap-2"><span className="text-orange-500 font-bold shrink-0">→</span> Asociar y representar a todas las instituciones bomberiles de la provincia.</li>
          <li className="flex gap-2"><span className="text-orange-500 font-bold shrink-0">→</span> Coordinar la acción conjunta de los cuerpos en emergencias y operaciones de gran escala.</li>
          <li className="flex gap-2"><span className="text-orange-500 font-bold shrink-0">→</span> Propiciar la creación de nuevas asociaciones en localidades que aún no cuenten con bomberos.</li>
          <li className="flex gap-2"><span className="text-orange-500 font-bold shrink-0">→</span> Colaborar con autoridades nacionales, provinciales y municipales en materia de prevención y emergencias.</li>
          <li className="flex gap-2"><span className="text-orange-500 font-bold shrink-0">→</span> Unificar criterios técnicos, operacionales, administrativos y de capacitación en toda la provincia.</li>
          <li className="flex gap-2"><span className="text-orange-500 font-bold shrink-0">→</span> Cumplir y hacer cumplir las leyes provinciales N°1.877 y N°3.025, y la Ley Nacional N°25.054.</li>
        </ul>
      </div>

      {/* Organismos */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
          <p className="text-xs font-black text-orange-700 uppercase tracking-widest mb-2">Comisión Directiva</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Es la autoridad representativa, administrativa y ejecutiva de la Federación. Elegida en Asamblea con mandatos de 2 años,
            está integrada por Presidente, Vicepresidentes, Secretarios, Tesorero y hasta 15 vocales titulares.
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
          <p className="text-xs font-black text-orange-700 uppercase tracking-widest mb-2">COLP</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            El Comando de Operaciones de La Pampa coordina la respuesta operativa ante siniestros, desastres o catástrofes.
            Organiza la provincia en 6 zonas e integra brigadas provinciales de Materiales Peligrosos, Incendios Forestales y K-9.
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
          <p className="text-xs font-black text-orange-700 uppercase tracking-widest mb-2">Escuela de Capacitación</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Dependiente de la Federación, tiene a su cargo la formación profesional de los bomberos voluntarios de la provincia.
            Opera con 6 escuelas zonales y 14 departamentos de especialidades operativas.
          </p>
        </div>
      </div>

      {/* Conexión nacional */}
      <div className="bg-white rounded-2xl border border-gray-200 p-7">
        <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3">Inserción en el sistema nacional</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          La Federación Pampeana forma parte del <strong className="text-gray-800">Consejo de Federaciones de Bomberos Voluntarios de la República Argentina (CFBVRA)</strong>,
          organismo nacional creado en 1988 que representa al Sistema Nacional de Bomberos Voluntarios ante los poderes públicos.
          A nivel operativo, la provincia integra la <strong className="text-gray-800">Región C</strong> de la Coordinación Única de Operaciones (CUO),
          junto a las federaciones bonaerense, de CABA, La Pampa y Tierra del Fuego, entre otras.
          En materia de formación, la Escuela Provincial articula con la <strong className="text-gray-800">Academia Nacional de Bomberos (ANB)</strong>,
          reconocida por la Ley 25.054 como órgano rector de los sistemas de capacitación federativos del país.
        </p>
      </div>

    </div>
  )
}

export default function InstitucionPage() {
  const [activeTab, setActiveTab] = useState("mvv")

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1">Escuela de Capacitación</p>
          <h1 className="text-3xl font-black text-gray-900">Institución</h1>
          <p className="text-sm text-gray-500 mt-1">Conocé quiénes somos, nuestra historia y nuestro equipo</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-semibold rounded-t-xl border-b-2 transition-colors -mb-px ${
                activeTab === tab.id
                  ? "border-orange-500 text-orange-600 bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div className="pt-2">
          {activeTab === "mvv"         && <TabMVV />}
          {activeTab === "organigrama" && <TabOrganigrama />}
          {activeTab === "historia"    && <TabHistoria />}
          {activeTab === "federacion"  && <TabFederacion />}
        </div>
      </div>
    </div>
  )
}
