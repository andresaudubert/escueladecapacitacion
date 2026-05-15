import Link from "next/link"

const CAMPUS_URL = "https://plataforma-bomberos.vercel.app"

export default function CampusPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
          🎓
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Campus Virtual</h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Accedé a la plataforma de evaluación para rendir tus exámenes, ver tus resultados y hacer el seguimiento de tu progreso.
        </p>
        <a
          href={CAMPUS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl transition-colors text-sm shadow-md"
        >
          Ingresar al Campus
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <p className="text-xs text-gray-400 mt-4">
          Vas a ser redirigido a{" "}
          <span className="font-mono">{CAMPUS_URL}</span>
        </p>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
