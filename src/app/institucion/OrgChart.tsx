"use client"

const W = 120, H = 38, RX = 8

const NODES = [
  { id: "dir", cx: 500, cy: 34,  label: "Andrés Audubert",   sub: "Director"             },
  { id: "vd",  cx: 370, cy: 119, label: "S. Pérez Campana",  sub: "Vicedirector"         },
  { id: "cd",  cx: 630, cy: 119, label: "Gabriela Paoli",    sub: "Coord. Departamentos" },
  { id: "rno", cx: 190, cy: 204, label: "Carla González",    sub: "Regional Norte/Oeste" },
  { id: "rs",  cx: 550, cy: 204, label: "Daniela Marín",     sub: "Regional Sur"         },
  { id: "z1",  cx: 60,  cy: 289, label: "C. Verna",          sub: "Zona 1"               },
  { id: "z2",  cx: 190, cy: 289, label: "I. Chiurazzi",      sub: "Zona 2"               },
  { id: "z3",  cx: 320, cy: 289, label: "H. Yrigoyen",       sub: "Zona 3"               },
  { id: "z4",  cx: 420, cy: 289, label: "J. Fredes Fdez.",   sub: "Zona 4"               },
  { id: "z5",  cx: 550, cy: 289, label: "M. Muñoz",          sub: "Zona 5"               },
  { id: "z6",  cx: 680, cy: 289, label: "E. Cleman",         sub: "Zona 6"               },
]

const EDGES: [string, string[]][] = [
  ["dir", ["vd", "cd"]],
  ["vd",  ["rno", "rs"]],
  ["rno", ["z1", "z2", "z3"]],
  ["rs",  ["z4", "z5", "z6"]],
]

const MAP = Object.fromEntries(NODES.map(n => [n.id, n]))

const DEPTS = [
  { dept: "Fuego",                     nombre: "Lucas Pellegrino"          },
  { dept: "Socorrismo",                nombre: "Julián Toseli Salazar"     },
  { dept: "Rescate Vehicular",         nombre: "Jorge Ruiz"                },
  { dept: "Rescate con Cuerdas",       nombre: "Marcelo Martínez"          },
  { dept: "Inc. Forestales",           nombre: "Juan Serraino"             },
  { dept: "Mat. Peligrosos",           nombre: "Roberto Sacco"             },
  { dept: "SCI",                       nombre: "Alina Tosco"               },
  { dept: "Búsq./Rescate Canes",       nombre: "Pamela Ávalo"              },
  { dept: "Rescate Acuático",          nombre: "David Rojas"               },
  { dept: "Protocolo y Ceremonial",    nombre: "Roque Martínez"            },
  { dept: "Seguridad Bomberil",        nombre: "Jazmín Bailo"              },
  { dept: "Op. de Bombas",             nombre: "Martín Meringer"           },
  { dept: "Psicología Emergencia",     nombre: "Gabriela Paoli"            },
  { dept: "Búsq./Rescate Estructuras", nombre: "Daniela Marín"             },
  { dept: "Cadetes",                   nombre: "Leandro Cortejarena"       },
]

export default function OrgChart() {
  return (
    <div className="space-y-6">

      {/* ── Árbol territorial ─────────────────────────────── */}
      <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
        <svg
          viewBox="-5 -5 755 325"
          className="w-full"
          style={{ minWidth: 580, maxHeight: 420 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Conectores */}
          {EDGES.map(([parentId, childIds]) => {
            const parent   = MAP[parentId]
            const children = childIds.map(id => MAP[id])
            const y1   = parent.cy + H / 2
            const y2   = children[0].cy - H / 2
            const ymid = (y1 + y2) / 2
            const minX = Math.min(...children.map(c => c.cx))
            const maxX = Math.max(...children.map(c => c.cx))
            return (
              <g key={parentId} stroke="#fdba74" strokeWidth="1.5" fill="none">
                <line x1={parent.cx} y1={y1}   x2={parent.cx} y2={ymid} />
                <line x1={minX}      y1={ymid}  x2={maxX}      y2={ymid} />
                {children.map(c => (
                  <line key={c.id} x1={c.cx} y1={ymid} x2={c.cx} y2={c.cy - H / 2} />
                ))}
              </g>
            )
          })}

          {/* Tarjetas */}
          {NODES.map(n => (
            <g key={n.id}>
              <rect
                x={n.cx - W / 2} y={n.cy - H / 2}
                width={W} height={H} rx={RX}
                fill="#fff7ed" stroke="#f97316" strokeWidth="1.2"
              />
              <text
                x={n.cx} y={n.cy - 4}
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="700"
                fill="#1c1917"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {n.label}
              </text>
              <text
                x={n.cx} y={n.cy + 9}
                textAnchor="middle"
                fontSize="7"
                fill="#9a3412"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {n.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* ── Departamentos de Especialidades ───────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-gray-200" />
          <p className="text-[11px] font-bold text-orange-600 uppercase tracking-widest whitespace-nowrap">
            Departamentos de Especialidades
          </p>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <p className="text-xs text-gray-400 mb-3 text-center">
          Bajo la coordinación de Gabriela Paoli
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {DEPTS.map(d => (
            <div
              key={d.dept}
              className="bg-orange-50 border border-orange-200 rounded-xl px-2 py-2.5 text-center"
            >
              <p className="text-[10px] font-bold text-orange-800 leading-tight">{d.dept}</p>
              <p className="text-[9px] text-gray-600 mt-0.5 leading-tight">{d.nombre}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
