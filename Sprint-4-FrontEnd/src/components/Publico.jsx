import { useEffect, useRef, useState } from 'react'
import { citacoes, estatisticas, validacoes } from '../data/conteudo.js'

/** Número que conta de 0 até o valor final quando entra na tela. */
function ContadorAnimado({ valor, sufixo = '' }) {
  const [atual, setAtual] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const semAnimacao = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!el || semAnimacao || !('IntersectionObserver' in window)) {
      setAtual(valor)
      return
    }

    const animacao = { id: 0 }
    const observador = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return
      observador.disconnect()
      const inicio = performance.now()
      const duracao = 1100
      const passo = (agora) => {
        const t = Math.min(1, (agora - inicio) / duracao)
        setAtual(Math.round(valor * (1 - Math.pow(1 - t, 3))))
        if (t < 1) animacao.id = requestAnimationFrame(passo)
      }
      animacao.id = requestAnimationFrame(passo)
    }, { threshold: 0.5 })

    observador.observe(el)
    return () => {
      observador.disconnect()
      cancelAnimationFrame(animacao.id)
    }
  }, [valor])

  return (
    <span ref={ref} className="tabular-nums">
      {atual}
      {sufixo}
    </span>
  )
}

export default function Publico() {
  return (
    <section id="publico" aria-labelledby="titulo-publico" className="secao bg-azul-claro">
      <div className="secao-interna">
        <p className="chapeu">Para quem é</p>
        <h2 id="titulo-publico" className="titulo-secao">
          Público-Alvo: Estudantes Full-time
        </h2>

        <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
          <article className="space-y-4">
            <p className="chamada-secao">
              Pessoas de 18 a 25 anos, cursando graduação ou pós-graduação em regime integral ou quase integral.
              Conciliam estudo, estágio ou trabalho, vida social e trajetos longos em transporte público — e usam o
              smartphone como ferramenta central de organização, conexão e autoexpressão.
            </p>
            <p className="text-cinza">
              Para esse público, cada decisão antes do disparo custa o momento. O Dynamic Action Button existe para
              devolver esse instante: menos tempo configurando, mais tempo vivendo a cena.
            </p>
          </article>

          <ul className="grid gap-4 sm:grid-cols-2">
            {estatisticas.map((e) => (
              <li key={e.valor} className="rounded-md border border-borda bg-white p-6">
                <strong className="mb-1 block text-[1.7rem] text-azul">{e.valor}</strong>
                <span className="text-[0.92rem] text-cinza">{e.texto}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 border-t border-borda pt-10">
          <p className="chapeu">O público já pediu isso</p>
          <h3 className="mb-5 text-[1.3rem] font-bold">Validado com quem vai usar</h3>

          <ul className="mb-8 grid gap-6 sm:grid-cols-3">
            {validacoes.map((v) => (
              <li key={v.valor}>
                <strong className="mb-1 block text-[2.6rem] font-extrabold leading-none text-coral-escuro">
                  <ContadorAnimado valor={v.valor} sufixo="%" />
                </strong>
                <span className="text-[0.94rem] text-cinza">{v.texto}</span>
                {/* barra proporcional ao percentual */}
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white" aria-hidden="true">
                  <div className="h-full rounded-full bg-coral" style={{ width: `${v.valor}%` }} />
                </div>
              </li>
            ))}
          </ul>

          <div className="grid gap-5 lg:grid-cols-2">
            {citacoes.map((c) => (
              <blockquote key={c.autor} className="rounded-md border border-borda bg-white px-6 py-6">
                <p className="mb-3 italic">"{c.texto}"</p>
                <cite className="text-sm font-semibold not-italic text-cinza-claro">{c.autor}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
