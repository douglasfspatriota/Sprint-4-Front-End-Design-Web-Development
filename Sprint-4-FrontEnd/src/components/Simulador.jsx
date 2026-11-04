import { useEffect, useRef, useState } from 'react'
import { gestos } from '../data/conteudo.js'

// Ajustes do reconhecimento de gestos
const TEMPO_HOLD_MS = 350 // segurar por mais que isso = vídeo
const DISTANCIA_DRAG_PX = 36 // arrastar mais que isso = drag
const ZOOM_MAXIMO = 10

const textosModo = {
  pronto: 'IA de contexto: cena detectada',
  foto: 'Foto capturada',
  video: 'Gravando — solte para parar',
  travado: 'Gravação travada — toque para parar',
  burst: 'Burst mode · 12 quadros',
  zoom: 'Zoom suave',
}

function formatarTempo(segundos) {
  const m = String(Math.floor(segundos / 60)).padStart(2, '0')
  const s = String(segundos % 60).padStart(2, '0')
  return `${m}:${s}`
}

export default function Simulador() {
  const [modo, setModo] = useState('pronto')
  const [segundos, setSegundos] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [quadros, setQuadros] = useState(0) // quadros do burst já "capturados"
  const [direcaoDrag, setDirecaoDrag] = useState(null) // para a dica visual durante o arraste
  const [historico, setHistorico] = useState({ fotos: 0, videos: 0, bursts: 0 })
  const [aviso, setAviso] = useState('')
  const [pressionado, setPressionado] = useState(false)

  // referências do gesto em andamento (não precisam re-renderizar)
  const gesto = useRef(null)
  const timerHold = useRef(null)
  const timerVolta = useRef(null)

  const gravando = modo === 'video' || modo === 'travado'

  // cronômetro da gravação
  useEffect(() => {
    if (!gravando) return
    const id = setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [gravando])

  // animação dos 12 quadros do burst
  useEffect(() => {
    if (modo !== 'burst' || quadros >= 12) return
    const id = setTimeout(() => setQuadros((q) => q + 1), 70)
    return () => clearTimeout(id)
  }, [modo, quadros])

  // limpa timers ao desmontar
  useEffect(() => () => {
    clearTimeout(timerHold.current)
    clearTimeout(timerVolta.current)
  }, [])

  function voltarAoInicioDepois(ms) {
    clearTimeout(timerVolta.current)
    timerVolta.current = setTimeout(() => setModo('pronto'), ms)
  }

  // ---------- ações de cada gesto ----------
  function tirarFoto() {
    setModo('foto')
    setHistorico((h) => ({ ...h, fotos: h.fotos + 1 }))
    setAviso('Foto capturada com cena e exposição ajustadas pela IA.')
    voltarAoInicioDepois(900)
  }

  function iniciarVideo(travado = false) {
    clearTimeout(timerVolta.current)
    setSegundos(0)
    setModo(travado ? 'travado' : 'video')
    setAviso(travado ? 'Gravação em mãos livres iniciada.' : 'Gravação iniciada.')
  }

  function pararVideo() {
    setHistorico((h) => ({ ...h, videos: h.videos + 1 }))
    setAviso(`Vídeo de ${segundos} segundo(s) salvo.`)
    setModo('pronto')
  }

  function fazerBurst() {
    setQuadros(0)
    setModo('burst')
    setHistorico((h) => ({ ...h, bursts: h.bursts + 1 }))
    setAviso('Burst de 12 quadros capturado; a IA escolheu o melhor.')
    voltarAoInicioDepois(2600)
  }

  function ajustarZoom(valor) {
    clearTimeout(timerVolta.current)
    const z = Math.min(ZOOM_MAXIMO, Math.max(1, valor))
    setZoom(Math.round(z * 10) / 10)
    setModo('zoom')
  }

  // ---------- reconhecimento por ponteiro (mouse, toque ou caneta) ----------
  function aoPressionar(e) {
    if (e.button !== undefined && e.button !== 0) return
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setPressionado(true)

    // com gravação travada, qualquer toque encerra
    if (modo === 'travado') {
      gesto.current = { encerrar: true }
      return
    }

    gesto.current = { x: e.clientX, y: e.clientY, tipo: null, zoomInicial: zoom }
    clearTimeout(timerHold.current)
    timerHold.current = setTimeout(() => {
      if (gesto.current && !gesto.current.tipo) {
        gesto.current.tipo = 'hold'
        iniciarVideo(false)
      }
    }, TEMPO_HOLD_MS)
  }

  function aoMover(e) {
    const g = gesto.current
    if (!g || g.encerrar) return
    const dx = e.clientX - g.x
    const dy = e.clientY - g.y

    // ainda não decidiu o gesto: verifica se virou um drag
    if (!g.tipo && Math.hypot(dx, dy) > DISTANCIA_DRAG_PX) {
      clearTimeout(timerHold.current)
      if (Math.abs(dy) > Math.abs(dx) && dy < 0) g.tipo = 'cima'
      else if (dx < 0) g.tipo = 'esquerda'
      else g.tipo = 'direita'
      setDirecaoDrag(g.tipo)
    }

    // zoom acompanha o polegar continuamente
    if (g.tipo === 'cima') ajustarZoom(g.zoomInicial + Math.max(0, -dy - DISTANCIA_DRAG_PX) / 25)
  }

  function aoSoltar() {
    const g = gesto.current
    gesto.current = null
    setPressionado(false)
    clearTimeout(timerHold.current)
    setDirecaoDrag(null)
    if (!g) return

    if (g.encerrar) return pararVideo()

    switch (g.tipo) {
      case 'hold':
        return pararVideo()
      case 'esquerda':
        return fazerBurst()
      case 'direita':
        return iniciarVideo(true)
      case 'cima':
        setAviso(`Zoom ajustado para ${zoom.toFixed(1)}x.`)
        return voltarAoInicioDepois(1400)
      default:
        return tirarFoto()
    }
  }

  function aoCancelar() {
    // ex.: o navegador assumiu a rolagem no meio do gesto
    const g = gesto.current
    gesto.current = null
    setPressionado(false)
    clearTimeout(timerHold.current)
    setDirecaoDrag(null)
    if (g?.tipo === 'hold') pararVideo()
  }

  // ---------- atalhos acessíveis (teclado / leitor de tela) ----------
  function executarGesto(id) {
    if (gravando && id !== 'tap' && id !== 'hold') return
    switch (id) {
      case 'tap':
        return gravando ? pararVideo() : tirarFoto()
      case 'hold':
        return modo === 'video' ? pararVideo() : iniciarVideo(false)
      case 'esquerda':
        return fazerBurst()
      case 'cima':
        ajustarZoom(zoom >= ZOOM_MAXIMO ? 1 : zoom + 1)
        setAviso(`Zoom ajustado para ${(zoom >= ZOOM_MAXIMO ? 1 : zoom + 1).toFixed(1)}x.`)
        return voltarAoInicioDepois(1400)
      case 'direita':
        return iniciarVideo(true)
    }
  }

  function zerar() {
    clearTimeout(timerVolta.current)
    setModo('pronto')
    setZoom(1)
    setSegundos(0)
    setHistorico({ fotos: 0, videos: 0, bursts: 0 })
    setAviso('Simulador reiniciado.')
  }

  const gestoAtivo = {
    foto: 'tap',
    video: 'hold',
    burst: 'esquerda',
    zoom: 'cima',
    travado: 'direita',
  }[modo]

  return (
    <section id="simulador" aria-labelledby="titulo-simulador" className="secao bg-azul-escuro text-[#cfd9f2]">
      <div className="secao-interna grid items-center gap-12 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="chapeu !text-[#ffcbb0]">Novo na Sprint 4 · Experimente</p>
          <h2 id="titulo-simulador" className="titulo-secao !text-white">
            Simulador do Dynamic Action Button
          </h2>
          <p className="max-w-[56ch] text-[1.05rem]">
            Use o botão coral do celular ao lado como se fosse o seu polegar: <strong className="text-white">toque</strong>,{' '}
            <strong className="text-white">segure</strong> ou <strong className="text-white">arraste</strong> para a esquerda,
            para cima ou para a direita. Funciona com mouse e com toque.
          </p>

          <p className="mt-8 mb-3 text-xs font-bold uppercase tracking-wider text-cinza-claro">
            Ou dispare um gesto pelos atalhos
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {gestos.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => executarGesto(g.id)}
                aria-pressed={gestoAtivo === g.id}
                className={`cursor-pointer rounded-md border px-3 py-3 text-left transition
                  ${gestoAtivo === g.id
                    ? 'border-coral bg-coral text-[#3a1200]'
                    : 'border-white/15 bg-white/5 hover:border-white/40 hover:bg-white/10'}`}
              >
                <span className={`block text-[0.7rem] font-extrabold tracking-wider ${gestoAtivo === g.id ? '' : 'text-coral'}`}>
                  {g.etiqueta}
                </span>
                <span className={`block text-sm font-semibold ${gestoAtivo === g.id ? '' : 'text-white'}`}>{g.titulo}</span>
              </button>
            ))}
          </div>

          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6">
            {[
              ['Fotos', historico.fotos],
              ['Vídeos', historico.videos],
              ['Bursts', historico.bursts],
              ['Zoom', `${zoom.toFixed(1)}x`],
            ].map(([rotulo, valor]) => (
              <div key={rotulo}>
                <dt className="text-xs font-bold uppercase tracking-wider text-cinza-claro">{rotulo}</dt>
                <dd className="text-2xl font-extrabold tabular-nums text-white">{valor}</dd>
              </div>
            ))}
            <button
              type="button"
              onClick={zerar}
              className="self-end cursor-pointer text-sm font-semibold text-[#ffcbb0] underline-offset-4 hover:underline"
            >
              Reiniciar
            </button>
          </dl>
        </div>

        {/* ---------- celular simulado ---------- */}
        <div className="mx-auto w-[min(300px,100%)] select-none">
          <div className="rounded-[44px] border-[10px] border-[#1d2740] bg-black p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-[9/17] overflow-hidden rounded-[32px] bg-[#0b1220]">
              {/* "cena" da câmera — escala com o zoom */}
              <div
                className="absolute inset-0 origin-center transition-transform duration-150 ease-out"
                style={{ transform: `scale(${zoom})` }}
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffb38a_0%,#ff7a45_35%,#1a3c8f_75%,#101930_100%)]" />
                <div className="absolute left-1/2 top-[30%] h-16 w-16 -translate-x-1/2 rounded-full bg-[#ffe3c7] shadow-[0_0_60px_20px_rgba(255,200,150,0.5)]" />
                <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[#0c1424] [clip-path:polygon(0_40%,18%_15%,34%_35%,52%_5%,70%_30%,86%_12%,100%_32%,100%_100%,0_100%)]" />
              </div>

              {/* foco da IA */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[30%] h-24 w-24 -translate-x-1/2 -translate-y-4 rounded-lg border-2 border-white/80"
              />

              {/* flash da foto */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 bg-white transition-opacity duration-300 ${modo === 'foto' ? 'opacity-80' : 'opacity-0'}`}
              />

              {/* barra superior */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-4 text-[0.7rem] font-bold text-white">
                <span className="rounded-full bg-black/40 px-2.5 py-1 backdrop-blur">{zoom.toFixed(1)}x</span>
                {gravando ? (
                  <span className="flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 tabular-nums">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                    {formatarTempo(segundos)}
                    {modo === 'travado' && ' 🔒'}
                  </span>
                ) : (
                  <span className="rounded-full bg-black/40 px-2.5 py-1 backdrop-blur">IA · AUTO</span>
                )}
              </div>

              {/* grade do burst */}
              {modo === 'burst' && (
                <div className="absolute inset-x-3 top-14 grid grid-cols-4 gap-1.5 rounded-xl bg-black/55 p-2 backdrop-blur" aria-hidden="true">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-[4px] transition
                        ${i < quadros ? 'bg-[linear-gradient(180deg,#ffb38a,#1a3c8f)]' : 'bg-white/10'}
                        ${quadros >= 12 && i === 7 ? 'ring-2 ring-coral ring-offset-1 ring-offset-black' : ''}`}
                    />
                  ))}
                  <p className="col-span-4 pt-1 text-center text-[0.65rem] font-bold text-white">
                    {quadros >= 12 ? '★ Quadro 8 escolhido pela IA' : 'Capturando…'}
                  </p>
                </div>
              )}

              {/* status + botão */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-black/70 to-transparent pb-6 pt-14">
                <p className="text-center text-[0.72rem] font-semibold text-white" aria-hidden="true">
                  {textosModo[modo]}
                </p>

                <div className="relative grid h-28 w-28 place-items-center">
                  {/* dicas de direção */}
                  {[
                    ['esquerda', '◄', 'left-0 top-1/2 -translate-y-1/2'],
                    ['cima', '▲', 'top-0 left-1/2 -translate-x-1/2'],
                    ['direita', '►', 'right-0 top-1/2 -translate-y-1/2'],
                  ].map(([dir, seta, pos]) => (
                    <span
                      key={dir}
                      aria-hidden="true"
                      className={`absolute text-xs transition ${pos} ${direcaoDrag === dir ? 'scale-150 text-coral' : 'text-white/50'}`}
                    >
                      {seta}
                    </span>
                  ))}

                  <button
                    type="button"
                    aria-label="Dynamic Action Button (toque, segure ou arraste)"
                    onPointerDown={aoPressionar}
                    onPointerMove={aoMover}
                    onPointerUp={aoSoltar}
                    onPointerCancel={aoCancelar}
                    onContextMenu={(e) => e.preventDefault()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        executarGesto('tap')
                      }
                    }}
                    className={`grid h-[72px] w-[72px] touch-none cursor-pointer place-items-center rounded-full border-4 border-white transition
                      focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#ffcbb0]
                      ${gravando ? 'bg-red-600' : 'bg-coral hover:bg-coral-escuro'}
                      ${pressionado ? 'scale-90' : ''}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`block bg-white transition-all ${gravando ? 'h-6 w-6 rounded-md' : 'h-3 w-3 rounded-full'}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-cinza-claro">Simulação ilustrativa — nenhuma câmera é acessada.</p>
        </div>
      </div>

      {/* anúncios para leitores de tela */}
      <p className="sr-only" aria-live="polite">
        {aviso}
      </p>
    </section>
  )
}
