"use client"

type NodeDef = {
  id: string
  name: string
  role: string
  x: number
  y: number
  level: 0 | 1 | 2 | 3 | 4
}

// ── Posiciones (centro de cada nodo) ──────────────────────────────────────
const NODES: NodeDef[] = [
  // Dirección central
  { id: "director", name: "Andrés Audubert",       role: "Director",               x: 590, y: 290, level: 0 },
  { id: "vd",       name: "S. Pérez Campana",       role: "Vicedirector",           x: 390, y: 205, level: 1 },
  { id: "cd",       name: "Gabriela Paoli",          role: "Coord. Departamentos",   x: 795, y: 205, level: 1 },

  // Coordinadoras regionales (rama izquierda, desde Vicedirector)
  { id: "rno", name: "Carla González",  role: "Regional Norte y Oeste", x: 218, y: 128, level: 2 },
  { id: "rs",  name: "Daniela Marín",   role: "Regional Sur",           x: 218, y: 368, level: 2 },

  // Zonas Norte/Oeste
  { id: "z1", name: "Cesar Verna",            role: "Director Zona 1",   x: 58, y:  62, level: 3 },
  { id: "z2", name: "Ignacio Chiurazzi",       role: "Director Zona 2",   x: 58, y: 140, level: 3 },
  { id: "z3", name: "Heber Yrigoyen",          role: "Director Zona 3",   x: 58, y: 218, level: 3 },

  // Zonas Sur
  { id: "z4", name: "Jorgelina Fredes Fdez.", role: "Directora Zona 4",  x: 58, y: 296, level: 3 },
  { id: "z5", name: "Mariela Muñoz",           role: "Directora Zona 5",  x: 58, y: 374, level: 3 },
  { id: "z6", name: "Eliana Cleman",           role: "Directora Zona 6",  x: 58, y: 452, level: 3 },

  // Departamentos — columna A
  { id: "d1",  name: "Lucas Pellegrino",      role: "Fuego",                    x: 970, y:  48, level: 4 },
  { id: "d2",  name: "Julián Toseli Salazar", role: "Socorrismo",               x: 970, y: 116, level: 4 },
  { id: "d3",  name: "Jorge Ruiz",            role: "Rescate Vehicular",        x: 970, y: 184, level: 4 },
  { id: "d4",  name: "Marcelo Martínez",      role: "Rescate con Cuerdas",      x: 970, y: 252, level: 4 },
  { id: "d5",  name: "Juan Serraino",         role: "Inc. Forestales",          x: 970, y: 320, level: 4 },
  { id: "d6",  name: "Roberto Sacco",         role: "Mat. Peligrosos",          x: 970, y: 388, level: 4 },
  { id: "d7",  name: "Alina Tosco",           role: "Cmd. Incidentes (SCI)",    x: 970, y: 456, level: 4 },
  { id: "d8",  name: "Pamela Ávalo",          role: "Búsq. Rescate Canes",      x: 970, y: 524, level: 4 },

  // Departamentos — columna B
  { id: "d9",  name: "David Rojas",           role: "Rescate Acuático/Buceo",  x: 1148, y:  82, level: 4 },
  { id: "d10", name: "Roque Martínez",        role: "Protocolo y Ceremonial",  x: 1148, y: 150, level: 4 },
  { id: "d11", name: "Jazmín Bailo",          role: "Seguridad Bomberil",      x: 1148, y: 218, level: 4 },
  { id: "d12", name: "Martín Meringer",       role: "Op. de Bombas",           x: 1148, y: 286, level: 4 },
  { id: "d13", name: "Gabriela Paoli",        role: "Psicología Emergencia",   x: 1148, y: 354, level: 4 },
  { id: "d14", name: "Daniela Marín",         role: "Búsq./Rescate Estructuras", x: 1148, y: 422, level: 4 },
  { id: "d15", name: "Leandro Cortejarena",   role: "Cadetes",                 x: 1148, y: 490, level: 4 },
]

const EDGES: [string, string][] = [
  ["director", "vd"],
  ["director", "cd"],
  ["vd", "rno"],
  ["vd", "rs"],
  ["rno", "z1"], ["rno", "z2"], ["rno", "z3"],
  ["rs",  "z4"], ["rs",  "z5"], ["rs",  "z6"],
]

// Tamaños de nodo por nivel
const SIZE: Record<number, { w: number; h: number }> = {
  0: { w: 160, h: 62 },
  1: { w: 150, h: 54 },
  2: { w: 144, h: 48 },
  3: { w: 140, h: 44 },
  4: { w: 140, h: 44 },
}

// Colores
const COL: Record<number, { bg: string; border: string; name: string; role: string; sw: number }> = {
  0: { bg: "#fff7ed", border: "#f97316", name: "#7c2d12", role: "#ea580c", sw: 2.5 },
  1: { bg: "#fff7ed", border: "#f97316", name: "#9a3412", role: "#ea580c", sw: 2   },
  2: { bg: "#fffbeb", border: "#f59e0b", name: "#78350f", role: "#b45309", sw: 1.5 },
  3: { bg: "#f8fafc", border: "#94a3b8", name: "#1e293b", role: "#64748b", sw: 1.5 },
  4: { bg: "#f8fafc", border: "#cbd5e1", name: "#334155", role: "#94a3b8", sw: 1   },
}

const SPINE_A_X = 882         // columna A spine
const SPINE_B_X = 1058        // columna B spine

export default function OrgChart() {
  const map = Object.fromEntries(NODES.map((n) => [n.id, n]))

  const deptA = ["d1","d2","d3","d4","d5","d6","d7","d8"]
  const deptB = ["d9","d10","d11","d12","d13","d14","d15"]

  const spineATop = map["d1"].y
  const spineABot = map["d8"].y
  const spineBTop = map["d9"].y
  const spineBBot = map["d15"].y

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <svg
        viewBox="0 0 1240 575"
        style={{ minWidth: 1240, height: 575 }}
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        {/* ── Spine A: cd → spine A → dept col A ───────────────────── */}
        {/* Horizontal de cd al spine */}
        <line x1={map.cd.x} y1={map.cd.y} x2={SPINE_A_X} y2={map.cd.y} stroke="#e2e8f0" strokeWidth="1.5" />
        {/* Spine vertical A */}
        <line x1={SPINE_A_X} y1={spineATop} x2={SPINE_A_X} y2={spineABot} stroke="#e2e8f0" strokeWidth="1.5" />
        {/* Horizontales hacia cada dept A */}
        {deptA.map((id) => {
          const n = map[id]
          return <line key={id} x1={SPINE_A_X} y1={n.y} x2={n.x - SIZE[4].w / 2} y2={n.y} stroke="#e2e8f0" strokeWidth="1.5" />
        })}

        {/* ── Spine B: desde col A hacia dept col B ────────────────── */}
        {/* Horizontal desde d1 derecha al spine B */}
        <line x1={map.d1.x + SIZE[4].w / 2} y1={map.d1.y} x2={SPINE_B_X} y2={map.d1.y} stroke="#e2e8f0" strokeWidth="1.5" />
        {/* Spine vertical B */}
        <line x1={SPINE_B_X} y1={spineBTop} x2={SPINE_B_X} y2={spineBBot} stroke="#e2e8f0" strokeWidth="1.5" />
        {/* Horizontales hacia cada dept B */}
        {deptB.map((id) => {
          const n = map[id]
          return <line key={id} x1={SPINE_B_X} y1={n.y} x2={n.x - SIZE[4].w / 2} y2={n.y} stroke="#e2e8f0" strokeWidth="1.5" />
        })}

        {/* ── Aristas principales ───────────────────────────────────── */}
        {EDGES.map(([from, to]) => {
          const f = map[from]
          const t = map[to]
          return (
            <line
              key={`${from}-${to}`}
              x1={f.x} y1={f.y} x2={t.x} y2={t.y}
              stroke="#d1d5db" strokeWidth="1.5"
            />
          )
        })}

        {/* ── Nodos ─────────────────────────────────────────────────── */}
        {NODES.map((node) => {
          const { w, h } = SIZE[node.level]
          const c = COL[node.level]
          const rx = node.x - w / 2
          const ry = node.y - h / 2
          const nameSize = node.level <= 1 ? 10.5 : node.level === 2 ? 9.5 : 9
          const roleSize = node.level === 0 ? 9 : 8

          return (
            <g key={node.id}>
              <rect
                x={rx} y={ry} width={w} height={h} rx="8"
                fill={c.bg} stroke={c.border} strokeWidth={c.sw}
              />
              <text
                x={node.x} y={ry + h * 0.40}
                textAnchor="middle"
                fontSize={nameSize} fontWeight="700"
                fill={c.name}
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {node.name}
              </text>
              <text
                x={node.x} y={ry + h * 0.74}
                textAnchor="middle"
                fontSize={roleSize}
                fill={c.role}
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {node.role}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-4 px-6 py-3 border-t border-gray-100 text-xs">
        {[
          { color: "#f97316", label: "Dirección / Gestión" },
          { color: "#f59e0b", label: "Coordinación Regional" },
          { color: "#94a3b8", label: "Dirección Zonal" },
          { color: "#cbd5e1", label: "Dpto. de Especialidades" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-gray-500">
            <div className="w-3 h-3 rounded-sm border-2 shrink-0" style={{ borderColor: color, backgroundColor: color + "22" }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
