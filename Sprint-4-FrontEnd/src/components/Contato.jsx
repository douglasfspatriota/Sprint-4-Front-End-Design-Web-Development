import { useState } from 'react'

const vazio = { nome: '', email: '', mensagem: '' }
const LIMITE_MENSAGEM = 500

function validar(campos) {
  const erros = {}
  if (campos.nome.trim().length < 3) erros.nome = 'Informe seu nome (mínimo de 3 letras).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(campos.email.trim())) erros.email = 'Informe um e-mail válido.'
  if (campos.mensagem.trim().length < 10) erros.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.'
  return erros
}

function Campo({ id, rotulo, erro, children }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {rotulo}
      </label>
      {children}
      {erro && (
        <p id={`${id}-erro`} className="text-sm font-semibold text-red-700">
          {erro}
        </p>
      )}
    </div>
  )
}

const classeEntrada = (erro) =>
  `w-full rounded-sm border bg-white px-4 py-3 text-[0.96rem] outline-none transition focus:ring-[3px]
   ${erro ? 'border-red-600 focus:ring-red-600/15' : 'border-borda focus:border-azul focus:ring-azul/15'}`

export default function Contato() {
  const [campos, setCampos] = useState(vazio)
  const [tocados, setTocados] = useState({})
  const [estado, setEstado] = useState('ocioso') // ocioso | enviando | enviado

  const erros = validar(campos)
  // só mostra o erro depois que o usuário saiu do campo (ou tentou enviar)
  const erroVisivel = (nome) => (tocados[nome] ? erros[nome] : undefined)

  function aoDigitar(e) {
    const { name, value } = e.target
    setCampos((c) => ({ ...c, [name]: value }))
    if (estado === 'enviado') setEstado('ocioso')
  }

  function aoSair(e) {
    setTocados((t) => ({ ...t, [e.target.name]: true }))
  }

  function aoEnviar(e) {
    e.preventDefault()
    setTocados({ nome: true, email: true, mensagem: true })
    if (Object.keys(erros).length) {
      // leva o foco ao primeiro campo com erro
      const primeiro = ['nome', 'email', 'mensagem'].find((c) => erros[c])
      document.getElementById(primeiro)?.focus()
      return
    }

    // front-end apenas: simula o envio
    setEstado('enviando')
    setTimeout(() => {
      setEstado('enviado')
      setCampos(vazio)
      setTocados({})
    }, 900)
  }

  const ariaCampo = (nome) => ({
    'aria-invalid': erroVisivel(nome) ? 'true' : undefined,
    'aria-describedby': erroVisivel(nome) ? `${nome}-erro` : undefined,
  })

  return (
    <section id="contato" aria-labelledby="titulo-contato" className="secao">
      <div className="secao-interna grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="chapeu">Fale com a gente</p>
          <h2 id="titulo-contato" className="titulo-secao">
            Contato
          </h2>
          <p className="chamada-secao">
            Dúvidas sobre o Dynamic Action Button ou sobre o projeto da equipe PrimeNext? Manda uma mensagem.
          </p>
        </div>

        <form
          noValidate
          onSubmit={aoEnviar}
          aria-label="Formulário de contato"
          className="grid gap-5 rounded-lg bg-azul-claro p-6 sm:p-8"
        >
          <Campo id="nome" rotulo="Nome" erro={erroVisivel('nome')}>
            <input
              id="nome"
              name="nome"
              type="text"
              autoComplete="name"
              placeholder="Seu nome"
              value={campos.nome}
              onChange={aoDigitar}
              onBlur={aoSair}
              className={classeEntrada(erroVisivel('nome'))}
              {...ariaCampo('nome')}
            />
          </Campo>

          <Campo id="email" rotulo="E-mail" erro={erroVisivel('email')}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="voce@email.com"
              value={campos.email}
              onChange={aoDigitar}
              onBlur={aoSair}
              className={classeEntrada(erroVisivel('email'))}
              {...ariaCampo('email')}
            />
          </Campo>

          <Campo id="mensagem" rotulo="Mensagem" erro={erroVisivel('mensagem')}>
            <textarea
              id="mensagem"
              name="mensagem"
              rows="4"
              maxLength={LIMITE_MENSAGEM}
              placeholder="Conte pra gente o que achou do Dynamic Action Button"
              value={campos.mensagem}
              onChange={aoDigitar}
              onBlur={aoSair}
              className={`${classeEntrada(erroVisivel('mensagem'))} resize-y`}
              {...ariaCampo('mensagem')}
            />
            <span className="justify-self-end text-xs tabular-nums text-cinza-claro">
              {campos.mensagem.length}/{LIMITE_MENSAGEM}
            </span>
          </Campo>

          <button
            type="submit"
            disabled={estado === 'enviando'}
            className="botao botao-primario w-full disabled:cursor-wait disabled:opacity-70"
          >
            {estado === 'enviando' ? 'Enviando…' : estado === 'enviado' ? 'Mensagem enviada ✓' : 'Enviar mensagem'}
          </button>

          <p aria-live="polite" className="text-center text-sm font-semibold text-azul empty:hidden">
            {estado === 'enviado' ? 'Obrigado! Recebemos sua mensagem (simulação — nada foi enviado de verdade).' : ''}
          </p>
        </form>
      </div>
    </section>
  )
}
