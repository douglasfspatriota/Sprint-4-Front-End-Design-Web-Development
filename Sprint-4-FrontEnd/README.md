# NextCam — Dynamic Action Button (Sprint 4)

Landing page da Challenge **JOVI Smartphone**, evoluída da Sprint 3 (HTML/CSS/JS puro) para **React + Tailwind CSS**, com deploy na **Vercel**.

O projeto apresenta o **Dynamic Action Button**: um botão dinâmico que substitui os mais de dez modos da câmera atual por cinco gestos simples (tap, hold e drag em três direções), cobrindo foto, vídeo, burst, zoom e gravação em mãos livres, com uma IA de contexto ajustando cena, foco e exposição antes do disparo.

🔗 **Deploy na Vercel:** https://SEU-PROJETO.vercel.app  <!-- substituir pelo link real após o deploy -->
🔗 **Repositório Git:** https://github.com/SEU-USUARIO/SEU-REPOSITORIO  <!-- substituir pelo link real -->

---

## Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| [React 19](https://react.dev) | Componentização da landing page e estado das funcionalidades interativas |
| [Vite 8](https://vite.dev) | Servidor de desenvolvimento e build de produção |
| [Tailwind CSS 4](https://tailwindcss.com) (`@tailwindcss/vite`) | Toda a estilização e a responsividade |
| JavaScript (ES Modules / JSX) | Lógica dos componentes e hooks |
| Git + [Vercel](https://vercel.com) | Versionamento e publicação |
| Oxlint | Verificação estática do código (`npm run lint`) |

## O que mudou da Sprint 3 para a Sprint 4

**Integração ao React** — o `index.html` único virou componentes (`Cabecalho`, `Destaque`, `Solucao`, `Publico`, `Galeria`, `Equipe`, `Contato`, `Rodape`). Os textos ficaram em `src/data/conteudo.js` e são renderizados com `.map()`.

**Tailwind CSS** — o `styles.css` foi substituído por classes utilitárias do Tailwind. A paleta da Sprint 3 (azul, coral, cinzas, raios e sombras) virou tema do Tailwind em `src/index.css` (`@theme`), então a identidade visual continua a mesma.

**Responsividade** — mantidos os três cenários da Sprint 3, agora pelos breakpoints do Tailwind:
- **Mobile** (< 640px): uma coluna, botões empilhados, menu hambúrguer.
- **Tablet** (640px–1023px): grades de 2–3 colunas, menu hambúrguer até 960px.
- **Desktop** (≥ 1024px): layout completo em grade, menu horizontal.

**Novas funcionalidades**
1. **Simulador do Dynamic Action Button** (seção nova): um celular na tela em que o visitante faz os 5 gestos de verdade com mouse ou toque (toque = foto, segurar = vídeo, arrastar ◄ = burst, ▲ = zoom contínuo, ► = gravação travada). Também tem atalhos por botão, contador de capturas e anúncios para leitores de tela.
2. **Galeria com visualizador ampliado** (lightbox): clique na imagem para ampliar, navegue com as setas ‹ › ou do teclado e feche com Esc.
3. **Formulário de contato com validação**: mensagens de erro por campo, contador de caracteres, estado "Enviando…" e confirmação (o envio é simulado, sem back-end).
4. **Menu com seção ativa**: o link da seção visível fica destacado enquanto a página rola.
5. **Contadores animados** nos dados de validação (84%, 73%, 61%) com barras proporcionais.
6. **Botão flutuante "voltar ao topo"**.

## Pré-requisitos

- **Node.js 20.19+ ou 22.12+** (exigido pelo Vite 8) — verifique com `node -v`
- **npm** (vem junto com o Node)

## Como instalar as dependências

```bash
# dentro da pasta do projeto (onde está o package.json)
npm install
```

## Como executar o projeto

```bash
npm run dev
```

Abra o endereço mostrado no terminal (normalmente **http://localhost:5173**).

Outros comandos:

```bash
npm run build     # gera a versão de produção na pasta dist/
npm run preview   # serve a versão de produção localmente (http://localhost:4173)
npm run lint      # verifica o código
```

## Back-end

O projeto **não possui back-end**: é somente front-end. Não há servidor para iniciar além do `npm run dev`.

## Usuários e senhas para teste

O projeto **não possui autenticação**, então não há usuários nem senhas.

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub (`git init`, `git add .`, `git commit`, `git push`).
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. A Vercel detecta o Vite automaticamente (Build Command: `npm run build`, Output Directory: `dist`). Clique em **Deploy**.
4. Cada novo `git push` na branch principal gera um novo deploy automaticamente.

## Estrutura do projeto

```
.
├── index.html               # HTML base (o React é montado em #root)
├── package.json             # dependências e scripts
├── vite.config.js           # Vite + plugin do React + plugin do Tailwind
├── public/
│   └── img/                 # ilustrações, mockups e favicon (os mesmos da Sprint 3)
├── src/
│   ├── main.jsx             # ponto de entrada do React
│   ├── App.jsx              # monta as seções da página
│   ├── index.css            # Tailwind + tema com a paleta da Sprint 3
│   ├── data/
│   │   └── conteudo.js      # textos, gestos, estatísticas, equipe e galeria
│   ├── hooks/
│   │   └── useSecaoAtiva.js # destaca no menu a seção visível
│   └── components/
│       ├── Cabecalho.jsx    # menu responsivo (hambúrguer no mobile)
│       ├── Destaque.jsx     # hero
│       ├── Solucao.jsx      # problema, comparativo, gestos e benefícios
│       ├── Simulador.jsx    # NOVO: simulador interativo do botão
│       ├── Publico.jsx      # público-alvo e validação (contadores animados)
│       ├── Galeria.jsx      # galeria com lightbox
│       ├── Equipe.jsx       # equipe PrimeNext
│       ├── Contato.jsx      # formulário com validação
│       ├── Rodape.jsx
│       └── BotaoTopo.jsx    # botão flutuante "voltar ao topo"
├── README.md
└── INTEGRANTES.txt
```

## Equipe — PrimeNext

Projeto acadêmico para a Challenge JOVI Smartphone — Sprint 4 (Front-End Design + Web Development).

| Integrante | RM |
|---|---|
| Douglas Ferreira Santos Patriota | 569713 |
| Pedro Henrique Santos de Brito | 573187 |
| Octavio Kal Oliveira Lima | 571838 |
| Vitor Santos Cintra | 569416 |
