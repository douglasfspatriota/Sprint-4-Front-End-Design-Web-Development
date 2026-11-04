import { useEffect, useState } from 'react'
import { linksMenu } from '../data/conteudo.js'
import useSecaoAtiva from '../hooks/useSecaoAtiva.js'

const idsObservados = [...linksMenu.map((l) => l.id), 'contato']

export default function Cabecalho() {
  const [aberto, setAberto] = useState(false)
  const secaoAtiva = useSecaoAtiva(idsObservados)

  // fecha o menu com a tecla Esc
  useEffect(() => {
    const aoTeclar = (e) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [])

  const fechar = () => setAberto(false)

  return (
    <header id="topo" className="sticky top-0 z-50 border-b border-borda bg-white/90 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-[1180px] items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5">
        <a href="#topo" className="flex items-center gap-2.5 text-[1.02rem] font-semibold" onClick={fechar}>
          <img src="/img/favicon.png" alt="" width="36" height="36" className="rounded-[9px]" />
          <span>
            JOVI <strong className="text-azul">NextCam</strong>
          </span>
        </a>

        {/* botão hambúrguer (só aparece abaixo de 880px) */}
        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer flex-col justify-center gap-[5px] nav:hidden"
          aria-expanded={aberto}
          aria-controls="menuNavegacao"
          aria-label={aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          onClick={() => setAberto((v) => !v)}
        >
          <span className={`block h-[2.5px] w-full rounded bg-azul-escuro transition ${aberto ? 'translate-y-[7.5px] rotate-45' : ''}`} />
          <span className={`block h-[2.5px] w-full rounded bg-azul-escuro transition ${aberto ? 'opacity-0' : ''}`} />
          <span className={`block h-[2.5px] w-full rounded bg-azul-escuro transition ${aberto ? '-translate-y-[7.5px] -rotate-45' : ''}`} />
        </button>

        <nav
          id="menuNavegacao"
          aria-label="Navegação principal"
          className={`absolute inset-x-0 top-full overflow-hidden border-b border-borda bg-white transition-[max-height] duration-300
            nav:static nav:max-h-none nav:overflow-visible nav:border-0 nav:bg-transparent
            ${aberto ? 'max-h-96' : 'max-h-0'}`}
        >
          <ul className="flex flex-col px-4 pb-5 pt-2 nav:flex-row nav:items-center nav:gap-5 lg:gap-7 nav:p-0">
            {linksMenu.map((link) => {
              const ativo = secaoAtiva === link.id
              return (
                <li key={link.id} className="w-full nav:w-auto">
                  <a
                    href={`#${link.id}`}
                    onClick={fechar}
                    aria-current={ativo ? 'true' : undefined}
                    className={`block border-b py-3 text-[0.96rem] font-semibold transition-colors
                      nav:border-b-2 nav:py-1.5
                      ${ativo ? 'border-borda text-azul nav:border-coral' : 'border-borda nav:border-transparent hover:nav:border-coral'}`}
                  >
                    {link.rotulo}
                  </a>
                </li>
              )
            })}
            <li className="mt-3 w-full nav:mt-0 nav:w-auto">
              <a
                href="#contato"
                onClick={fechar}
                className="block rounded-full bg-azul px-5 py-2.5 text-center text-[0.96rem] font-semibold text-white transition hover:bg-azul-escuro"
              >
                Contato
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
