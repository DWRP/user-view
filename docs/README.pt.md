# Aplicativo de Lista de Usuários

![Vercel](https://vercelbadge.vercel.app/api/dwrp/user-view)
![Versão](https://img.shields.io/github/package-json/v/dwrp/user-view)
![Pontuação do Lighthouse](https://img.shields.io/badge/lighthouse-100%2F100-brightgreen)
[![English Version](https://img.shields.io/badge/readme-EN--US-blue)](../README.md)

Uma aplicação simples de página única (SPA) construída com React que exibe uma lista de usuários obtidos de uma API pública.

## Funcionalidades

- Buscar e exibir dados de usuários da API JSONPlaceholder
- Alternar entre visualização em cartões e em tabela
- Funcionalidade de busca com persistência na URL
- Design responsivo
- Componentes de UI acessíveis utilizando React Aria Components

## Tecnologias Utilizadas

- ReactJS
- React Router DOM
- Styled Components
- React Aria Components
- RSBuild
- TypeScript
- Testing Library
- Jest

## Instalação

Instale as dependências:

```bash
# pnpm, yarn ou npm
pnpm install
yarn install
npm install
```

## Iniciar o Servidor de Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
# pnpm, yarn ou npm
pnpm dev
yarn dev
npm run dev
```

## Construir para Produção

Construa o aplicativo para produção:

```bash
# pnpm, yarn ou npm
pnpm build
yarn build
npm run build
```

## Pré-visualizar a Versão de Produção

Pré-visualize a versão de produção localmente:

```bash
# pnpm, yarn ou npm
pnpm preview
yarn preview
npm run preview
```

## Estrutura do Projeto

O projeto segue uma abordagem de arquitetura limpa, separando responsabilidades em diferentes camadas:

- `components`: Contém todos os componentes React, estilizados e funcionais.
- `hooks`: Contém hooks personalizados para gerenciamento de estado e lógica de negócios.
- `services`: Contém classes de serviço para interação com APIs externas.
- `store`: Gerencia o estado centralizado (se aplicável).
- `themes`: Contém a tematização global e específica de componentes usando Styled Components.

Para mais detalhes sobre a arquitetura, consulte o arquivo [ARCHITECTURE.md](./docs/ARCHITECTURE.pt.md).

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para enviar um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT.
