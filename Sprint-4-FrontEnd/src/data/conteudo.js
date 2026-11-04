// Conteúdo da landing page (mesmo da Sprint 3), separado em dados
// para que os componentes React apenas renderizem as listas.

export const linksMenu = [
  { id: 'solucao', rotulo: 'A Solução' },
  { id: 'simulador', rotulo: 'Simulador' },
  { id: 'publico', rotulo: 'Público-Alvo' },
  { id: 'galeria', rotulo: 'Galeria' },
  { id: 'equipe', rotulo: 'Nossa Equipe' },
]

export const passosAntigos = [
  'Abrir a câmera',
  'Escolher o modo certo',
  'Ajustar foco e exposição',
  'Disparar — se o momento ainda existir',
]

export const passosNovos = [
  'Abrir a câmera',
  'Um gesto no botão — foto, vídeo, burst, zoom ou gravação travada',
]

export const gestos = [
  { id: 'tap', etiqueta: 'TAP', titulo: 'Foto instantânea', texto: 'Cena e exposição já ajustadas antes do toque.' },
  { id: 'hold', etiqueta: 'HOLD', titulo: 'Vídeo contínuo', texto: 'Grava enquanto segura, sem trocar de aba.' },
  { id: 'esquerda', etiqueta: 'DRAG ◄', titulo: 'Burst mode', texto: 'Sequência de 12 quadros; a IA elege a melhor.' },
  { id: 'cima', etiqueta: 'DRAG ▲', titulo: 'Zoom suave', texto: 'Curso contínuo com o polegar, sem pinça.' },
  { id: 'direita', etiqueta: 'DRAG ►', titulo: 'Vídeo mão livre', texto: 'Trava a gravação: filma sem manter o botão pressionado.' },
]

export const beneficios = [
  {
    chapeu: 'Ergonomia',
    titulo: 'Cabe no polegar',
    texto: 'Uma mão só, sem reposicionar o aparelho. O gesto funciona no escuro, no movimento e sem olhar a tela.',
  },
  {
    chapeu: 'Carga mental',
    titulo: 'Nada a aprender',
    texto: 'Um controle em vez de sete. Some a pergunta "qual modo eu uso?", que é o que trava a maioria dos usuários no automático.',
  },
  {
    chapeu: 'Habilita a IA',
    titulo: 'Sem pedir permissão',
    texto: 'Com uma intenção única, a IA pode ajustar cena, eleger o melhor quadro e alertar antes do erro sem interromper o usuário.',
  },
]

export const estatisticas = [
  { valor: '3 em 1', texto: 'estuda, trabalha e mantém vida social no mesmo dia corrido' },
  { valor: '+2h', texto: 'em trajeto de transporte público, em média, por dia letivo' },
  { valor: '10+ modos', texto: 'disputando espaço na tela da câmera atual, sem hierarquia' },
  { valor: '1 gesto', texto: 'é o quanto o Dynamic Action Button exige para qualquer uma das 5 funções' },
]

export const validacoes = [
  { valor: 84, texto: 'reconheceram o problema de fotos borradas em eventos sociais' },
  { valor: 73, texto: 'preferem uma câmera que decide por eles a configurar modos' },
  { valor: 61, texto: 'trocariam de aparelho por uma IA que entenda o contexto' },
]

export const citacoes = [
  { texto: 'Eu nem abro os modos avançados — se a câmera fizer sozinha, é perfeito.', autor: 'Estudante, 20 anos' },
  { texto: 'Minha maior dor é perder a foto do rolê. Se a IA avisar, eu compro.', autor: 'Estudante, 22 anos' },
]

export const galeria = [
  {
    src: '/img/mockup-gestures.png',
    alt: 'Diagrama do Dynamic Action Button mostrando o botão central com cinco gestos: tap, hold e drag em três direções, cada um ligado a uma função da câmera.',
    titulo: '5 gestos, 1 botão',
    legenda: 'tap, hold e drag cobrem todas as funções.',
  },
  {
    src: '/img/mockup-antes-depois.png',
    alt: 'Comparação entre a câmera atual, com 4 passos e cerca de 4,2 segundos até o disparo, e a NextCam, com 1 passo e cerca de 0,8 segundos.',
    titulo: 'Antes vs. depois',
    legenda: 'de 4 passos (≈4,2s) para 1 gesto (≈0,8s).',
  },
  {
    src: '/img/mockup-burst.png',
    alt: 'Tela de burst mode mostrando uma grade de 12 quadros capturados em rajada, com um quadro destacado como escolhido automaticamente pela IA.',
    titulo: 'Burst mode',
    legenda: 'a IA escolhe o melhor quadro da rajada.',
  },
  {
    src: '/img/mockup-ergonomia.png',
    alt: 'Ilustração de uma mão segurando o smartphone com o polegar alcançando o Dynamic Action Button no canto inferior da tela, sem precisar reposicionar o aparelho.',
    titulo: 'Cabe no polegar',
    legenda: 'uma mão só, mesmo no escuro ou em movimento.',
  },
]

export const equipe = [
  {
    iniciais: 'DP',
    nome: 'Douglas Ferreira Santos Patriota',
    rm: '569713',
    bio: 'Responsável pela construção desta Landing Page e pela costura entre o conceito do Dynamic Action Button e a experiência final em código.',
  },
  {
    iniciais: 'PB',
    nome: 'Pedro Henrique Santos de Brito',
    rm: '573187',
    bio: 'Cuidou da experiência do Dynamic Action Button e da consistência visual entre os cinco gestos do botão.',
  },
  {
    iniciais: 'OL',
    nome: 'Octavio Kal Oliveira Lima',
    rm: '571838',
    bio: 'Estruturou o escopo, o backlog priorizado e o diagrama de caso de uso que sustentam tecnicamente a NextCam.',
  },
  {
    iniciais: 'VC',
    nome: 'Vitor Santos Cintra',
    rm: '569416',
    bio: 'Desenvolveu o Story Canvas e o roteiro da campanha que conecta o Dynamic Action Button à rotina real da persona.',
  },
]
