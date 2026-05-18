"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"

const NAV_LINKS = [
  { href: "/",            label: "Inicio",      external: false },
  { href: "/institucion", label: "Institución", external: false },
  { href: "/biblioteca",  label: "Biblioteca",  external: false },
  { href: "/contacto",    label: "Contacto",    external: false },
  { href: "/campus",      label: "Campus",      external: false },
]

const EXTERNAL_LINKS = [
  {
    href:  "https://capacitacion.fundacionbancopampa.com.ar/",
    label: "Campus BLP",
    title: "Campus Virtual — Fundación Banco de La Pampa",
    logo:  "/logo-blp.png",
  },
  {
    href:  "https://campus.anbvirtual.org.ar/",
    label: "Campus ANB",
    title: "Campus Virtual — Academia Nacional de Bomberos",
    logo:  "/logo-anb.png",
  },
]

export default function NavBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <Image
            src="/escudo-federacion.png"
            alt="Escudo Escuela de Capacitación"
            width={44}
            height={44}
            className="shrink-0 rounded-full"
            priority
          />
          <div className="leading-tight min-w-0">
            <span className="text-sm font-black text-gray-900 block uppercase tracking-wide">
              Escuela de Capacitación
            </span>
            <span className="text-[10px] font-medium text-gray-500 hidden sm:block uppercase tracking-widest">
              Federación Bomberos Voluntarios de La Pampa
            </span>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
            const isCampus = link.href === "/campus"

            /* Insertar botones externos antes de Contacto */
            const isContacto = link.href === "/contacto"

            return (
              <>
                {isContacto && EXTERNAL_LINKS.map((ext) => (
                  <a
                    key={ext.href}
                    href={ext.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={ext.title}
                    className="px-3 py-2 rounded-lg text-sm font-semibold transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex items-center gap-1.5"
                  >
                    <Image
                      src={ext.logo}
                      alt={ext.label}
                      width={20}
                      height={20}
                      className="rounded-sm object-contain shrink-0"
                    />
                    {ext.label}
                  </a>
                ))}
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isCampus
                      ? "bg-orange-500 hover:bg-orange-400 text-white ml-2"
                      : isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              </>
            )
          })}
        </nav>

        {/* Hamburger mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <span className={`block w-5 h-0.5 bg-gray-700 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Nav mobile */}
      {open && (
        <nav className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-1 bg-white">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
            const isCampus = link.href === "/campus"
            const isContacto = link.href === "/contacto"
            return (
              <>
                {isContacto && EXTERNAL_LINKS.map((ext) => (
                  <a
                    key={ext.href}
                    href={ext.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Image
                      src={ext.logo}
                      alt={ext.label}
                      width={22}
                      height={22}
                      className="rounded-sm object-contain shrink-0"
                    />
                    {ext.label}
                  </a>
                ))}
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isCampus
                      ? "bg-orange-500 text-white"
                      : isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              </>
            )
          })}
        </nav>
      )}
    </header>
  )
}
