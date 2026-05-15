import type { Metadata } from "next"
import "./globals.css"
import NavBar from "@/components/NavBar"

export const metadata: Metadata = {
  title: "Escuela de Capacitación | Fed. BB.VV. La Pampa",
  description: "Escuela de Capacitación de la Federación de Bomberos Voluntarios de La Pampa",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-gray-50 antialiased">
        <NavBar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-gray-900 text-gray-400 text-center text-xs py-5 mt-16">
          © {new Date().getFullYear()} Escuela de Capacitación · Federación de Bomberos Voluntarios de La Pampa
        </footer>
      </body>
    </html>
  )
}
