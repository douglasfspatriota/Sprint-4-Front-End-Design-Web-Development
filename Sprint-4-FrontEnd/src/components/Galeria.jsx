import { useCallback, useEffect, useRef, useState } from 'react'
import { galeria } from '../data/conteudo.js'

/** Visualizador ampliado (lightbox) com navegação por teclado e setas. */
function Visualizador({ indice, aoFechar, aoNavegar }) {
  const item = galeria[indice]
  const botaoFechar = useRef(null)

  useEffect(() => {
    const anterior = document.activeElement
    botaoFechar.current?.focus()
    document.body.style.overflow = 'hidden'

    const aoTeclar = (e) => {
      if (e.key === 'Escape') aoFechar()
      if (e.key === 'ArrowRight') aoNavegar(1)
      if (e.key === 'ArrowLeft') aoNavegar(-1)
    }
    window.addEventListener('keydown', aoTeclar)
    return () => {
      window.removeEventListener('keydown', aoTeclar)
      document.body.style.overflow = ''
      anterior?.focus?.()
    }
  }, [aoFechar, aoNavegar])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.titulo} — imagem ${indice + 1} de ${galeria.length}`}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-azul-profundo/90 p-4 backdrop-blur-sm"
      onClick={aoFechar}
    >
      <figure
        className="relative flex max-h-full w-full max-w-md flex-col overflow-hidden rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={item.src} alt={item.alt} className="max-h-[70vh] w-full bg-azul-claro object-contain" />
        <figcaption className="flex items-center justify-between gap-3 px-5 py-4 text-sm text-cinza">
          <span>
            <strong className="block text-azul-escuro">{item.titulo}</strong>
            {item.legenda}
          </span>
          <span className="shrink-0 tabular-nums text-cinza-claro">
            {indice + 1}/{galeria.length}
          </span>
        </figcaption>

        <button
          ref={botaoFechar}
          type="button"
          onClick={aoFechar}
          aria-label="Fechar"
          className="absolute right-3 top-3 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-azul-escuro/80 text-xl text-white hover:bg-azul-escuro"
        >
          ×
        </button>
      </figure>

      {[
        [-1, '‹', 'Imagem anterior', 'left-2 sm:left-6'],
        [1, '›', 'Próxima imagem', 'right-2 sm:right-6'],
      ].map(([dir, seta, rotulo, pos]) => (
        <button
          key={dir}
          type="button"
          aria-label={rotulo}
          onClick={(e) => {
            e.stopPropagation()
            aoNavegar(dir)
          }}
          className={`absolute top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/15 text-3xl text-white hover:bg-white/30 ${pos}`}
        >
          {seta}
        </button>
      ))}
    </div>
  )
}

export default function Galeria() {
  const [aberto, setAberto] = useState(null) // índice da imagem ampliada

  const fechar = useCallback(() => setAberto(null), [])
  const navegar = useCallback(
    (dir) => setAberto((i) => (i + dir + galeria.length) % galeria.length),
    [],
  )

  return (
    <section id="galeria" aria-labelledby="titulo-galeria" className="secao">
      <div className="secao-interna">
        <p className="chapeu">Como funciona, na tela</p>
        <h2 id="titulo-galeria" className="titulo-secao">
          Galeria
        </h2>
        <p className="chamada-secao">O Dynamic Action Button em ação, do gesto ao resultado. Clique para ampliar.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {galeria.map((item, i) => (
            <figure key={item.src} className="m-0 overflow-hidden rounded-lg border border-borda bg-azul-claro">
              <button
                type="button"
                onClick={() => setAberto(i)}
                aria-label={`Ampliar: ${item.titulo}`}
                className="group block w-full cursor-zoom-in overflow-hidden"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  width="900"
                  height="1160"
                  loading="lazy"
                  className="h-auto w-full transition duration-300 group-hover:scale-[1.03]"
                />
              </button>
              <figcaption className="px-4 pb-5 pt-4 text-sm text-cinza">
                <strong className="mb-0.5 block text-azul-escuro">{item.titulo}</strong>
                {item.legenda}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {aberto !== null && <Visualizador indice={aberto} aoFechar={fechar} aoNavegar={navegar} />}
    </section>
  )
}
