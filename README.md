# 🎮 Minigame Hub

Um hub de minigames desenvolvido em **React/Next.js**, que reúne vários jogos clássicos como Tetris e outros em um único app.  
O projeto foi desenvolvido com o desafio de criar os minigames com **o mínimo de bibliotecas externas possível**, mantendo o foco em lógica, performance e modularidade.

<br />

## ✨ Funcionalidades

- 🧩 Hub modular para adicionar facilmente novos minigames.
- 🎯 Cada minigame é independente, facilitando manutenção e expansão.
- ⚡ Controle de estados e campos dos jogos implementados com React/TypeScript.
- 🗺️ Navegação simples usando o roteamento do Next.js.

<br />

## 🕹️ Catálogo de Minigames

- 🟦 **Tetris** (🛠️ Em desenvolvimento) -> Jogar
- 💣 **Bomberman** (🚧 Em breve)

> ⚠️ O status indica se o minigame está pronto para jogar. Jogos ainda em desenvolvimento não têm link ativo.

<br />

## 🛠️ Tecnologias

- ⚛️ React 19 / Next.js 16
- 📝 TypeScript
- 🎨 Styled-components
- 🏗️ Arquitetura modular para facilitar a inclusão de novos minigames

<br />

## 🚀 Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/willian-froes/Minigame.git
cd Minigame
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o projeto:

```bash
npm run dev
```

<br />

## 📁 Estrutura do projeto

- **/app** - principais arquivos
  - **/components** - componentes reutilizáveis
  - **/minigames** - páginas, componentes e outros recursos dos minigames
- **/public** - recursos de assets
  - **/favicons** - arquivos de ícones das páginas

<br />

## 📃 Versionamento

1. Fazer commits convencionais

```
git add .
git commit -m "feat: add minigames screen"
git commit -m "fix: part key down movement"
```

2. Gerar release (definir nível de modificação)

```
npm run release:<major, minior ou patch>
```

3. Enviar para o GitHub

```
git push origin main --follow-tags
```

Resultado (exemplo com patch):

```
## [0.0.2] - 2025-11-01
### Added
- adiciona tela de seleção de minigames

### Fixed
- corrige bug no Tetris
```

<br />

## 📜 Licença

Este projeto é **não comercial** e está licenciado sob os termos especificados no arquivo [`LICENSE.md`](./LICENSE.md).

> Você pode usar o código para fins educacionais ou desenvolvimento de projetos pessoais, mas **não para uso comercial**.  
> O autor não se responsabiliza por qualquer violação de direitos autorais relacionados aos minigames originais que foram recriados para fins de estudo e prática de desenvolvimento.

<br />

## 🤝 Contribuição

Contribuições são bem-vindas!  
Para contribuir, faça um fork do projeto, adicione seu minigame ou melhoria, e envie um Pull Request.
