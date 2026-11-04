import Cabecalho from './components/Cabecalho.jsx'
import Destaque from './components/Destaque.jsx'
import Solucao from './components/Solucao.jsx'
import Simulador from './components/Simulador.jsx'
import Publico from './components/Publico.jsx'
import Galeria from './components/Galeria.jsx'
import Equipe from './components/Equipe.jsx'
import Contato from './components/Contato.jsx'
import Rodape from './components/Rodape.jsx'
import BotaoTopo from './components/BotaoTopo.jsx'

export default function App() {
  return (
    <>
      <Cabecalho />
      <main>
        <Destaque />
        <Solucao />
        <Simulador />
        <Publico />
        <Galeria />
        <Equipe />
        <Contato />
      </main>
      <Rodape />
      <BotaoTopo />
    </>
  )
}
