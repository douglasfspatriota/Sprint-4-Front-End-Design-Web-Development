import { useEffect, useState } from 'react'

/**
 * Observa as seções da página e devolve o id da que está visível,
 * para destacar o link correspondente no menu.
 */
export default function useSecaoAtiva(ids) {
  const [ativa, setAtiva] = useState('')

  useEffect(() => {
    const elementos = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elementos.length || !('IntersectionObserver' in window)) return

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) setAtiva(entrada.target.id)
        })
      },
      // considera "ativa" a seção que cruza a faixa central da tela
      { rootMargin: '-45% 0px -50% 0px' },
    )

    elementos.forEach((el) => observador.observe(el))
    return () => observador.disconnect()
  }, [ids])

  return ativa
}
