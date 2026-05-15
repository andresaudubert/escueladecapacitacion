"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const NAV_LINKS = [
  { href: "/",            label: "Inicio" },
  { href: "/institucion", label: "Institución" },
  { href: "/biblioteca",  label: "Biblioteca" },
  { href: "/campus",      label: "Campus" },
]

export default function NavBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-red-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shrink-0">
            <span className="text-red-700 font-black text-sm">EC</span>
          </div>
          <div className="leading-tight">
            <span className="text-sm font-bold block">Escuela de Capacitación</span>
            <span className="text-xs font-normal opacity-80 hidden sm:block">Fed. BB.VV. La Pampa</span>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-white text-red-700"
                    : "text-white hover:bg-white/20"
                } ${link.href === "/campus" ? "bg-amber-500 hover:bg-amber-400 text-white ml-2" : ""}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Hamburger mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 hover:bg-white/20 rounded-lg transition-colors"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Nav mobile */}
      {open && (
        <nav className="md:hidden border-t border-white/20 px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive ? "bg-white text-red-700" : "text-white hover:bg-white/20"
                } ${link.href === "/campus" ? "bg-amber-500 hover:bg-amber-400 text-white" : ""}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
