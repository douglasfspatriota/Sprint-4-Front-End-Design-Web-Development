import { equipe } from '../data/conteudo.js'

export default function Equipe() {
  return (
    <section id="equipe" aria-labelledby="titulo-equipe" className="secao bg-azul-claro">
      <div className="secao-interna">
        <p className="chapeu">Quem construiu</p>
        <h2 id="titulo-equipe" className="titulo-secao">
          Nossa Equipe — PrimeNext
        </h2>
        <p className="chamada-secao">
          Quatro Engenheiros de Software, uma solução só: do conceito do Dynamic Action Button ao roteiro de campanha.
        </p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {equipe.map((p) => (
            <li
              key={p.rm}
              className="rounded-lg border border-borda bg-white px-6 py-7 transition hover:-translate-y-1 hover:shadow-suave"
            >
              <span
                aria-hidden="true"
                className="mb-4 inline-flex h-[54px] w-[54px] items-center justify-center rounded-full bg-azul font-bold text-white"
              >
                {p.iniciais}
              </span>
              <h3 className="mb-1 text-[1.02rem] font-bold">{p.nome}</h3>
              <p className="text-sm font-bold text-azul">Engenheiro de Software</p>
              <p className="mb-3 text-[0.82rem] text-cinza-claro">RM {p.rm}</p>
              <p className="text-sm text-cinza">{p.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
