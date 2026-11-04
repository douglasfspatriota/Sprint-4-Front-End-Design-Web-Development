import { beneficios, gestos, passosAntigos, passosNovos } from '../data/conteudo.js'

function CartaoComparativo({ variante, chapeu, passos, nota, tempo }) {
  const novo = variante === 'novo'
  return (
    <div
      role="listitem"
      className={`rounded-lg px-6 py-7 ${novo ? 'bg-coral text-[#3a1200]' : 'bg-azul-escuro text-[#cdd4e6]'}`}
    >
      <p className="mb-3.5 text-xs font-bold uppercase tracking-wider opacity-85">{chapeu}</p>
      <ol className="mb-5 grid gap-2.5">
        {passos.map((passo) => (
          <li key={passo} className={`relative pl-7 text-[0.96rem] ${novo ? 'font-bold' : ''}`}>
            <span aria-hidden="true" className={`absolute left-0 top-0.5 text-[0.85em] ${novo ? '' : 'text-[#ff9d7a]'}`}>
              {novo ? '✓' : '✕'}
            </span>
            {passo}
          </li>
        ))}
      </ol>
      {nota && <p className="-mt-2 mb-5 text-sm opacity-85">{nota}</p>}
      <p className="text-[2rem] font-extrabold tabular-nums">{tempo}</p>
    </div>
  )
}

export default function Solucao() {
  return (
    <section id="solucao" aria-labelledby="titulo-solucao" className="secao">
      <div className="secao-interna">
        <p className="chapeu">A Challenge</p>
        <h2 id="titulo-solucao" className="titulo-secao">
          O problema que a JOVI nos trouxe
        </h2>
        <p className="chamada-secao">
          Hoje, a maioria das pessoas usa a câmera do smartphone só no automático. A interface reúne mais de dez modos —
          Alta Resolução, Panorâmica, Documento em Ultra HD, Câmera Lenta, Astro, Profissional e por aí vai — todos
          misturados em uma grade única, sem nenhuma relação com o que o usuário está realmente vivendo naquele momento.
        </p>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="space-y-4 text-cinza">
            <h3 className="text-[1.35rem] font-bold !text-azul">Nossa solução: Dynamic Action Button</h3>
            <p>
              Um único botão dinâmico substitui os mais de dez modos da câmera atual. Cinco gestos —{' '}
              <strong>tap, hold e três direções de drag</strong> — cobrem foto, vídeo, burst, zoom e gravação em mãos
              livres. Por trás, uma IA de contexto ajusta cena, foco e exposição antes mesmo do toque acontecer.
            </p>
            <p>
              O problema não é falta de recursos na câmera — é excesso de decisão no momento errado. Com o Dynamic Action
              Button, o estudante só decide <em>o que</em> quer registrar; nunca <em>como</em> configurar.
            </p>
          </article>

          <div role="list" aria-label="Comparação entre a câmera atual e a NextCam" className="grid gap-5 sm:grid-cols-2">
            <CartaoComparativo variante="antigo" chapeu="Câmera atual · 4 passos" passos={passosAntigos} tempo="≈ 4,2 s" />
            <CartaoComparativo
              variante="novo"
              chapeu="NextCam · 1 passo"
              passos={passosNovos}
              nota="Cena, foco e instante já resolvidos pela IA."
              tempo="≈ 0,8 s"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-borda pt-6 sm:grid-cols-3 lg:grid-cols-5">
          {gestos.map((g) => (
            <article key={g.id} className="px-0.5">
              <span className="mb-2 inline-block text-xs font-extrabold tracking-wider text-coral-escuro">{g.etiqueta}</span>
              <h4 className="mb-1 font-bold">{g.titulo}</h4>
              <p className="text-sm text-cinza">{g.texto}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs font-bold tracking-[1.6px] text-cinza-claro">
          UMA MÃO · ZERO MENUS · ZERO TROCA DE MODO
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {beneficios.map((b) => (
            <article
              key={b.titulo}
              className="border-t-[3px] border-coral pt-3 sm:border-l-[3px] sm:border-t-0 sm:pl-5 sm:pt-0"
            >
              <p className="chapeu">{b.chapeu}</p>
              <h4 className="mb-1.5 text-[1.05rem] font-bold">{b.titulo}</h4>
              <p className="text-[0.92rem] text-cinza">{b.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
