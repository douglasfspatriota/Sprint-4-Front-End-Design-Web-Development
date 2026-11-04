export default function Destaque() {
  return (
    <section
      aria-labelledby="titulo-destaque"
      className="bg-[linear-gradient(150deg,#1a3c8f_0%,#142d6b_65%,#0c1424_100%)] px-4 pb-12 pt-10 text-white sm:px-6 lg:pb-[4.4rem] lg:pt-[3.6rem]"
    >
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="chapeu !text-[#ffcbb0]">JOVI Smartphone · Challenge de Câmera</p>
          <h1 id="titulo-destaque" className="mb-4 max-w-[16ch] text-[clamp(1.9rem,3.2vw,2.8rem)] font-bold !text-white">
            Todo o controle da câmera cabe em um gesto.
          </h1>
          <p className="max-w-[48ch] text-[1.1rem] text-[#cfd9f2]">
            O <strong>Dynamic Action Button</strong> é o novo botão dinâmico da câmera JOVI: tap, hold e drag em três
            direções cobrem foto, vídeo, burst, zoom e gravação em mãos livres — enquanto a IA de contexto decide cena,
            foco e exposição por trás.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a href="#solucao" className="botao botao-primario">
              Conheça a solução
            </a>
            <a href="#simulador" className="botao botao-fantasma">
              Testar o botão
            </a>
          </div>
        </div>

        {/* no tablet/mobile a ilustração vem antes do texto, como na Sprint 3 */}
        <figure className="order-first w-full max-w-[300px] justify-self-start lg:order-none lg:max-w-[420px] lg:justify-self-center">
          <img
            src="/img/hero-illustration.png"
            width="1000"
            height="1000"
            alt="Ilustração de um smartphone JOVI com o Dynamic Action Button em destaque e três setas indicando os gestos de arrastar para burst mode, zoom e vídeo em mãos livres."
          />
        </figure>
      </div>
    </section>
  )
}
