import { useEffect, useState } from 'react'

/** Botão flutuante que aparece depois de rolar a página. */
export default function BotaoTopo() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 700)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <a
      href="#topo"
      aria-label="Voltar ao topo"
      tabIndex={visivel ? 0 : -1}
      aria-hidden={!visivel}
      className={`fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-coral text-xl font-bold text-white shadow-suave transition hover:bg-coral-escuro
        ${visivel ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      ↑
    </a>
  )
}
