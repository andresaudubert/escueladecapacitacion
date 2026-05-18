"use client"

import { useState } from "react"

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
const ZONA_IDS = new Set(["z1","z2","z3","z4","z5","z6"])

type Rol = { rol: string; nombre: string }

type ZonaDetalle = {
  id: string; nombre: string; email: string
  equipo: Rol[]; cuarteles: string[]
}

type DptoDetalle = {
  id: string; nombre: string; email: string
  equipo: Rol[]; instructores: string[]; colaboradores: string[]
}

const ZONAS: ZonaDetalle[] = [
  {
    id: "z1", nombre: "Escuela Zonal 1", email: "zona1escuelabvlp@gmail.com",
    equipo: [
      { rol: "Director",       nombre: "Cesar Verna"          },
      { rol: "Vice Director",  nombre: "Daniel Tobares"        },
      { rol: "Secretario",     nombre: "Matias Suarez"         },
      { rol: "Pro Secretaria", nombre: "María Cortaberria"     },
    ],
    cuarteles: ["Alta Italia", "Bernardo de Larroude y Sarah", "Intendente Alvear", "Rancul", "Realicó"],
  },
  {
    id: "z2", nombre: "Escuela Zonal 2", email: "zona2escuelabvlp@gmail.com",
    equipo: [
      { rol: "Director",        nombre: "Ignacio Chiurazzi"  },
      { rol: "Vice Directora",  nombre: "Hilda Luna"         },
      { rol: "Secretario",      nombre: "Renzo Odetti"       },
      { rol: "Pro Secretario",  nombre: "Daniel Altamirano"  },
    ],
    cuarteles: ["Arata", "Caleufú", "Embajador Martini", "Ingeniero Luiggi", "La Maruja", "Parera"],
  },
  {
    id: "z3", nombre: "Escuela Zonal 3", email: "zona3escuelabvlp@gmail.com",
    equipo: [
      { rol: "Director",        nombre: "Heber Yrigoyen"  },
      { rol: "Vice Directora",  nombre: "Fiama Pico"      },
      { rol: "Secretaria",      nombre: "Patricia Molina" },
      { rol: "Pro Secretaria",  nombre: "Graciela Rojas"  },
    ],
    cuarteles: ["25 de Mayo", "Algarrobo del Águila", "Eduardo Castex", "General Pico", "Santa Isabel", "Trenel", "Victorica"],
  },
  {
    id: "z4", nombre: "Escuela Zonal 4", email: "zona4escuelabvlp@gmail.com",
    equipo: [
      { rol: "Directora",       nombre: "Jorgelina Fernandez" },
      { rol: "Vice Director",   nombre: "Gustavo Arias"       },
      { rol: "Secretaria",      nombre: "Silvina Abbona"      },
      { rol: "Pro Secretario",  nombre: "Fernando Arias"      },
    ],
    cuarteles: ["Anguil", "Catriló", "Colonia Barón", "Lonquimay", "Miguel Cané", "Quemú Quemú", "Winifreda"],
  },
  {
    id: "z5", nombre: "Escuela Zonal 5", email: "zona5escuelabvlp@gmail.com",
    equipo: [
      { rol: "Directora",       nombre: "Mariela Muñoz"   },
      { rol: "Vice Director",   nombre: "Milton Heit"      },
      { rol: "Secretaria",      nombre: "Nora Ozan"        },
      { rol: "Pro Secretaria",  nombre: "Mariana Burgui"   },
    ],
    cuarteles: ["Alpachiri", "Ataliva Roca", "Doblas", "Guatraché", "Macachín", "Miguel Riglos", "Toay"],
  },
  {
    id: "z6", nombre: "Escuela Zonal 6", email: "zona6escuelabvlp@gmail.com",
    equipo: [
      { rol: "Directora",       nombre: "Eliana Cleman"       },
      { rol: "Vice Director",   nombre: "Lautaro Urbanovich"  },
      { rol: "Secretaria",      nombre: "Pamela Lambercht"    },
      { rol: "Pro Secretaria",  nombre: "Flor Catalan"        },
    ],
    cuarteles: ["Bernasconi", "Casa de Piedra", "General Acha", "General San Martín", "Jacinto Arauz", "La Adela"],
  },
]

const DEPTS: DptoDetalle[] = [
  {
    id: "fuego", nombre: "Fuego", email: "fuegoescuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinador",     nombre: "Lucas Pellegrino"  },
      { rol: "Sub Coordinador", nombre: "Emanuel Escudero"  },
    ],
    instructores:  ["Lucio Ciampoli", "Heber Yrigoyen", "Graciela Rojas", "Daniel Tobares", "Martín Pereyra"],
    colaboradores: ["Claudio Ostertag", "Erica Ortiz"],
  },
  {
    id: "socorrismo", nombre: "Socorrismo", email: "socorrismoescuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinador",     nombre: "Julian Zalazar" },
      { rol: "Sub Coordinador", nombre: "Martín Torres"  },
    ],
    instructores:  ["Hilda Luna", "Eliana Clemann", "Mariana Burgui", "Ignacio Chiurazzi", "Juan Calfuan", "Fiama Picco"],
    colaboradores: ["Sol Puhl", "Patricia Perez", "Azul Brilz", "Natan Gonzalez"],
  },
  {
    id: "rescveh", nombre: "Rescate Vehicular", email: "rescatevehicularescuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinador",           nombre: "Jorge Ruiz"       },
      { rol: "Sub Coordinador",        nombre: "Cesar Verna"      },
      { rol: "Secretario",             nombre: "Andrés Audubert"  },
      { rol: "Secretaria Pedagógica",  nombre: "Mariela Muñoz"    },
    ],
    instructores:  ["Edgardo Velastini", "Nestor Aguirre", "Jose Hevia", "Mauro Herrera"],
    colaboradores: [],
  },
  {
    id: "cuerdas", nombre: "Rescate con Cuerdas", email: "rescateconcuerdasescuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinador",     nombre: "Marcelo Martínez" },
      { rol: "Sub Coordinador", nombre: "Uciel Serraino"   },
    ],
    instructores:  ["Gerardo Salvatori", "Veronica Santander", "Evelyn Selalles", "Pablo Peralta"],
    colaboradores: [],
  },
  {
    id: "forestal", nombre: "Inc. Forestales", email: "iforestalescuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinador",     nombre: "Juan Serraino"  },
      { rol: "Sub Coordinador", nombre: "Julio Córdoba"  },
    ],
    instructores:  ["Walter Berger", "Nicolas Jerez", "Melisa Welch"],
    colaboradores: ["Federico Justiniano", "Alma Tassone", "Carlos Torres", "Pamela Ávalos", "Benjamin Leonar", "Ayelen Hollman", "Nora Ozan"],
  },
  {
    id: "matpel", nombre: "Mat. Peligrosos", email: "matpelescuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinador",      nombre: "Roberto Sacco" },
      { rol: "Sub Coordinadora", nombre: "Lis Rearte"    },
    ],
    instructores:  ["Pablo Calderon", "Marcos Vernetti", "Elias Guillermo", "Enzo Ojeda"],
    colaboradores: [],
  },
  {
    id: "sci", nombre: "SCI", email: "comandoescuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinadora", nombre: "Alina Tosco" },
    ],
    instructores:  ["Roberto Torres", "Walter Berger", "Damian Bollak"],
    colaboradores: ["Lourdes Bender", "Silvina Abbona"],
  },
  {
    id: "k9", nombre: "Búsq./Rescate Canes", email: "k9escuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinadora", nombre: "Pamela Ávalo" },
    ],
    instructores:  [],
    colaboradores: [],
  },
  {
    id: "acuatico", nombre: "Rescate Acuático", email: "resacuaticoescuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinador", nombre: "David Rojas" },
    ],
    instructores:  ["Ricardo Balduzzi", "Cesar Solano", "Celso Retamales", "Fabio Fernández"],
    colaboradores: ["Raul Fibiger", "Anabela Laborde"],
  },
  {
    id: "protocolo", nombre: "Protocolo y Ceremonial", email: "protocoloescuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinador",     nombre: "Roque Martínez" },
      { rol: "Sub Coordinador", nombre: "Juan Tome"      },
    ],
    instructores:  ["Celeste Escudero", "Marcos Vernetti", "Juan Cerda"],
    colaboradores: [],
  },
  {
    id: "seguridad", nombre: "Seg. Bomberil", email: "seguridadescuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinadora", nombre: "Jazmín Bailo" },
    ],
    instructores:  ["Maria Morell", "Patricia Molina", "Maria Montalbano"],
    colaboradores: ["Andrea Montalbano"],
  },
  {
    id: "bombas", nombre: "Op. de Bombas", email: "conduccionescuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinador", nombre: "Martín Meringer" },
    ],
    instructores:  [],
    colaboradores: ["Santiago Elizarriaga", "Pablo Pollo", "German Garin", "Oscar Zabala", "Javier Bogarin"],
  },
  {
    id: "psicologia", nombre: "Psicología Emergencia", email: "psicologiaescuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinadora",    nombre: "Gabriela Paoli" },
      { rol: "Sub Coordinador", nombre: "Ariel Irusta"   },
    ],
    instructores:  [],
    colaboradores: [],
  },
  {
    id: "brec", nombre: "Búsq./Rescate Estructuras", email: "brecescuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinadora",    nombre: "Daniela Marín"  },
      { rol: "Sub Coordinador", nombre: "Fabian Perrone" },
    ],
    instructores:  ["Alexis Cuello"],
    colaboradores: ["Fernández Yesica"],
  },
  {
    id: "cadetes", nombre: "Cadetes", email: "cadetesescuelabvlp@gmail.com",
    equipo: [
      { rol: "Coordinador", nombre: "Leandro Cortejarena"  },
      { rol: "Secretario",  nombre: "Juan Nicolas Martin"  },
    ],
    instructores:  ["Eliana Cleman", "Juan Pereyra", "Debora Ydraste", "Camila Sauco"],
    colaboradores: [],
  },
]

const ZONA_MAP = Object.fromEntries(ZONAS.map(z => [z.id, z]))
const DEPT_MAP  = Object.fromEntries(DEPTS.map(d => [d.id, d]))

export default function OrgChart() {
  const [selected, setSelected] = useState<string | null>(null)

  const selZona = selected ? ZONA_MAP[selected] : null
  const selDept = selected ? DEPT_MAP[selected]  : null

  function toggle(id: string) {
    setSelected(prev => prev === id ? null : id)
  }

  return (
    <div className="space-y-6">

      {/* ── Árbol territorial ─────────────────────────────── */}
      <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
        <p className="text-[10px] text-gray-400 text-center pt-3">
          Hacé clic en una Zona para ver el equipo y los cuarteles
        </p>
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
                <line x1={parent.cx} y1={y1}  x2={parent.cx} y2={ymid} />
                <line x1={minX}      y1={ymid} x2={maxX}      y2={ymid} />
                {children.map(c => (
                  <line key={c.id} x1={c.cx} y1={ymid} x2={c.cx} y2={c.cy - H / 2} />
                ))}
              </g>
            )
          })}

          {/* Tarjetas */}
          {NODES.map(n => {
            const isZone = ZONA_IDS.has(n.id)
            const isSel  = selected === n.id
            return (
              <g
                key={n.id}
                onClick={isZone ? () => toggle(n.id) : undefined}
                style={isZone ? { cursor: "pointer" } : undefined}
              >
                <rect
                  x={n.cx - W / 2} y={n.cy - H / 2}
                  width={W} height={H} rx={RX}
                  fill={isSel ? "#f97316" : "#fff7ed"}
                  stroke={isSel ? "#ea580c" : "#f97316"}
                  strokeWidth={isSel ? "2" : "1.2"}
                />
                <text
                  x={n.cx} y={n.cy - 4}
                  textAnchor="middle" fontSize="8.5" fontWeight="700"
                  fill={isSel ? "#fff" : "#1c1917"}
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  {n.label}
                </text>
                <text
                  x={n.cx} y={n.cy + 9}
                  textAnchor="middle" fontSize="7"
                  fill={isSel ? "#fed7aa" : "#9a3412"}
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  {n.sub}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* ── Panel zona seleccionada ───────────────────────── */}
      {selZona && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-xs font-black text-orange-600 uppercase tracking-widest">{selZona.nombre}</p>
              <a href={`mailto:${selZona.email}`} className="text-xs text-gray-500 hover:text-orange-600 transition-colors">
                {selZona.email}
              </a>
            </div>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Equipo</p>
              <div className="space-y-2">
                {selZona.equipo.map(p => (
                  <div key={p.rol} className="flex gap-3">
                    <span className="text-[10px] text-gray-400 w-32 shrink-0 pt-px">{p.rol}</span>
                    <span className="text-xs font-semibold text-gray-800">{p.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Cuarteles</p>
              <div className="flex flex-wrap gap-1.5">
                {selZona.cuarteles.map(c => (
                  <span key={c} className="text-xs bg-white border border-orange-200 text-orange-800 px-2 py-1 rounded-lg">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
          Bajo la coordinación de Gabriela Paoli · Hacé clic para ver el equipo
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {DEPTS.map(d => {
            const isSel = selected === d.id
            return (
              <button
                key={d.id}
                onClick={() => toggle(d.id)}
                className={`rounded-xl px-2 py-2.5 text-center border transition-all ${
                  isSel
                    ? "bg-orange-500 border-orange-500"
                    : "bg-orange-50 border-orange-200 hover:border-orange-400"
                }`}
              >
                <p className={`text-[10px] font-bold leading-tight ${isSel ? "text-white" : "text-orange-800"}`}>
                  {d.nombre}
                </p>
                <p className={`text-[9px] mt-0.5 leading-tight ${isSel ? "text-orange-100" : "text-gray-500"}`}>
                  {d.equipo[0]?.nombre}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Panel departamento seleccionado ──────────────── */}
      {selDept && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-xs font-black text-orange-600 uppercase tracking-widest">
                Dpto. {selDept.nombre}
              </p>
              <a href={`mailto:${selDept.email}`} className="text-xs text-gray-500 hover:text-orange-600 transition-colors">
                {selDept.email}
              </a>
            </div>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Conducción</p>
              <div className="space-y-2">
                {selDept.equipo.map(p => (
                  <div key={p.rol}>
                    <p className="text-[10px] text-gray-400">{p.rol}</p>
                    <p className="text-xs font-semibold text-gray-800">{p.nombre}</p>
                  </div>
                ))}
              </div>
            </div>
            {selDept.instructores.length > 0 && (
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Instructores/as</p>
                <div className="flex flex-wrap gap-1.5">
                  {selDept.instructores.map(i => (
                    <span key={i} className="text-[10px] bg-white border border-orange-200 text-orange-900 px-2 py-0.5 rounded-lg">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {selDept.colaboradores.length > 0 && (
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Colaboradores/as</p>
                <div className="flex flex-wrap gap-1.5">
                  {selDept.colaboradores.map(c => (
                    <span key={c} className="text-[10px] bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
