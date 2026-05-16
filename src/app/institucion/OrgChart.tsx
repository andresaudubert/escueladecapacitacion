"use client"

// ── Paleta ──────────────────────────────────────────────────────────────────
const C = {
  director:   { fill: "#f97316", text: "#fff", r: 38 },
  management: { fill: "#fb923c", text: "#fff", r: 28 },
  regional:   { fill: "#0d9488", text: "#fff", r: 23 },
  zona:       { fill: "#5eead4", text: "#0f5752", r: 18 },
  dept:       { fill: "#e2e8f0", text: "#334155", r: 17 },
}

// ── Nodos ────────────────────────────────────────────────────────────────────
// Posiciones calculadas para un layout hub-and-spoke que entra en pantalla.
// Rama izquierda: estructura territorial (Vicedirector → Regionales → Zonas)
// Rama derecha: departamentos de especialidades (CoordDepts → 15 depts en arco)
const NODES = [
  // ── Core ─────────────────────────────────────────────
  { id: "dir", x: 430, y: 245, label: "Andrés Audubert",     sub: "Director",              ...C.director   },
  { id: "vd",  x: 280, y: 245, label: "S. Pérez Campana",    sub: "Vicedirector",          ...C.management },
  { id: "cd",  x: 580, y: 245, label: "Gabriela Paoli",      sub: "Coord. Departamentos",  ...C.management },

  // ── Regionales ───────────────────────────────────────
  { id: "rno", x: 164, y: 168, label: "Carla González",  sub: "Regional Norte/Oeste", ...C.regional },
  { id: "rs",  x: 164, y: 328, label: "Daniela Marín",   sub: "Regional Sur",         ...C.regional },

  // ── Zonas Norte/Oeste ────────────────────────────────
  { id: "z1", x:  52, y: 100, label: "C. Verna",       sub: "Zona 1", ...C.zona },
  { id: "z2", x:  40, y: 168, label: "I. Chiurazzi",   sub: "Zona 2", ...C.zona },
  { id: "z3", x:  78, y: 248, label: "H. Yrigoyen",    sub: "Zona 3", ...C.zona },

  // ── Zonas Sur ────────────────────────────────────────
  { id: "z4", x:  62, y: 248, label: "J. Fredes Fdez.", sub: "Zona 4", ...C.zona },
  { id: "z5", x:  40, y: 328, label: "M. Muñoz",       sub: "Zona 5", ...C.zona },
  { id: "z6", x:  78, y: 408, label: "E. Cleman",      sub: "Zona 6", ...C.zona },

  // ── Departamentos (arco derecho desde CoordDepts) ────
  // r=165, ángulos de -82° a 104°, 15 nodos, paso ~13°
  { id: "d1",  x: 608, y:  81, label: "L. Pellegrino",    sub: "Fuego",              ...C.dept },
  { id: "d2",  x: 644, y:  82, label: "J. Toseli Salazar",sub: "Socorrismo",         ...C.dept },
  { id: "d3",  x: 678, y:  90, label: "J. Ruiz",          sub: "Rescate Vehicular",  ...C.dept },
  { id: "d4",  x: 709, y: 106, label: "M. Martínez",      sub: "Rescate Cuerdas",    ...C.dept },
  { id: "d5",  x: 734, y: 130, label: "J. Serraino",      sub: "Inc. Forestales",    ...C.dept },
  { id: "d6",  x: 752, y: 162, label: "R. Sacco",         sub: "Mat. Peligrosos",    ...C.dept },
  { id: "d7",  x: 760, y: 198, label: "A. Tosco",         sub: "SCI",                ...C.dept },
  { id: "d8",  x: 758, y: 236, label: "P. Ávalo",         sub: "Búsq./Rescate Canes",...C.dept },
  { id: "d9",  x: 746, y: 273, label: "D. Rojas",         sub: "Rescate Acuático",   ...C.dept },
  { id: "d10", x: 726, y: 307, label: "R. Martínez",      sub: "Protocolo",          ...C.dept },
  { id: "d11", x: 697, y: 336, label: "J. Bailo",         sub: "Seg. Bomberil",      ...C.dept },
  { id: "d12", x: 661, y: 357, label: "M. Meringer",      sub: "Op. de Bombas",      ...C.dept },
  { id: "d13", x: 622, y: 369, label: "G. Paoli",         sub: "Psicología Emerg.",  ...C.dept },
  { id: "d14", x: 584, y: 371, label: "D. Marín",         sub: "Búsq./Rescate Estr.",...C.dept },
  { id: "d15", x: 548, y: 362, label: "L. Cortejarena",   sub: "Cadetes",            ...C.dept },
]

// ── Conexiones ───────────────────────────────────────────────────────────────
const EDGES: [string, string][] = [
  ["dir","vd"], ["dir","cd"],
  ["vd","rno"], ["vd","rs"],
  ["rno","z1"], ["rno","z2"], ["rno","z3"],
  ["rs","z4"],  ["rs","z5"],  ["rs","z6"],
  ["cd","d1"],  ["cd","d2"],  ["cd","d3"],  ["cd","d4"],  ["cd","d5"],
  ["cd","d6"],  ["cd","d7"],  ["cd","d8"],  ["cd","d9"],  ["cd","d10"],
  ["cd","d11"], ["cd","d12"], ["cd","d13"], ["cd","d14"], ["cd","d15"],
]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export default function OrgChart() {
  const map = Object.fromEntries(NODES.map((n) => [n.id, n]))

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <svg
        viewBox="18 55 768 360"
        className="w-full"
        style={{ maxHeight: 480 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Líneas de conexión */}
        {EDGES.map(([a, b]) => {
          const fa = map[a], fb = map[b]
          return (
            <line key={`${a}-${b}`}
              x1={fa.x} y1={fa.y} x2={fb.x} y2={fb.y}
              stroke="#e2e8f0" strokeWidth="1.5"
            />
          )
        })}

        {/* Nodos */}
        {NODES.map((n) => {
          const fontSize = n.r >= 35 ? 12 : n.r >= 25 ? 9 : n.r >= 20 ? 7.5 : 6.5
          const labelSize = n.r >= 35 ? 7.5 : n.r >= 25 ? 6.5 : 5.5
          const labelY = n.y + n.r + 9

          return (
            <g key={n.id}>
              {/* Círculo principal */}
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.fill} />
              {/* Iniciales */}
              <text
                x={n.x} y={n.y + fontSize * 0.38}
                textAnchor="middle"
                fontSize={fontSize}
                fontWeight="800"
                fill={n.text}
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {initials(n.label)}
              </text>
              {/* Nombre */}
              <text
                x={n.x} y={labelY}
                textAnchor="middle"
                fontSize={labelSize}
                fontWeight="600"
                fill="#1e293b"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {n.label}
              </text>
              {/* Rol */}
              <text
                x={n.x} y={labelY + labelSize + 1.5}
                textAnchor="middle"
                fontSize={Math.max(labelSize - 0.5, 4.5)}
                fill="#64748b"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {n.sub}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-4 px-6 py-3 border-t border-gray-100 text-xs text-gray-500">
        {[
          { color: "#f97316", label: "Director" },
          { color: "#fb923c", label: "Equipo de Gestión" },
          { color: "#0d9488", label: "Coordinación Regional" },
          { color: "#5eead4", label: "Dirección Zonal" },
          { color: "#e2e8f0", label: "Dpto. de Especialidades", dark: true },
        ].map(({ color, label, dark }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color, border: dark ? "1px solid #cbd5e1" : "none" }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
