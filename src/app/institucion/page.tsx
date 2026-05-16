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
    <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl">📖</div>
        <h3 className="text-base font-black text-gray-900 uppercase tracking-wide">Historia de la Escuela</h3>
      </div>
      <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
        <p className="italic text-gray-400 border-l-4 border-orange-200 pl-4">
          El contenido de esta sección está en elaboración y será publicado próximamente.
        </p>
      </div>
    </div>
  )
}

function TabFederacion() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl">🤝</div>
        <h3 className="text-base font-black text-gray-900 uppercase tracking-wide">La Federación</h3>
      </div>
      <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
        <p className="italic text-gray-400 border-l-4 border-orange-200 pl-4">
          El contenido de esta sección está en elaboración y será publicado próximamente.
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
