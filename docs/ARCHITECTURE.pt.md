# Arquitetura

Este documento descreve as decisões arquiteturais e padrões utilizados no Aplicativo de Lista de Usuários.

[![English Version](https://img.shields.io/badge/architecture-EN--US-blue)](./ARCHITECTURE.md)

## Estrutura do Projeto

O projeto segue uma estrutura simples, mas eficaz, evitando over-engineering. Embora a Arquitetura Limpa (Clean Architecture) tenha sido considerada inicialmente, foi determinado que a estrutura atual atende às necessidades do projeto sem adicionar complexidade desnecessária. Qualquer mudança estrutural futura será avaliada em equipe.

### Camada de Componentes

Localizada em `src/components`, esta camada contém:

- Componentes de interface de usuário, estilizados e não estilizados.
- Componentes de organismo e molécula são construídos aqui, enquanto átomos e componentes estilizados de baixo nível ficam em `src/components/styled` para estender os componentes do React Aria.

### Camada de Hooks

Localizada em `src/hooks`, esta camada contém:

- Hooks personalizados que encapsulam a lógica específica para a interface de usuário e gerenciamento de estado.

### Camada de Serviços

Localizada em `src/services`, esta camada contém:

- Interações com APIs externas e lógica de busca de dados.

### Camada de Estado Global

A camada `src/store` é usada para gerenciar estados globais, como preferências de tema e idioma. Zustand é utilizado para persistir e recuperar esses estados.

### Camada de Temas

Localizada em `src/themes`, esta camada contém:

- Configurações relacionadas aos temas, incluindo temas escuro e claro, além de estilos globais.

## Padrões de Design e Decisões

Embora o projeto seja relativamente simples, vários princípios de design e padrões foram adotados:

1. **Design Baseado em Componentes**: Componentes são divididos em átomos estilizados e moléculas e organismos de nível mais alto, para garantir a separação de responsabilidades.
2. **Zustand para Estado Global**: Utilizado para gerenciar temas e idiomas, garantindo que futuras adições (como suporte multilíngue) sejam fáceis de implementar.
3. **Styled Components**: Componentes estilizados foram criados para estender os componentes do React Aria, quando o estilo padrão não atendia aos requisitos de design.

## Princípios SOLID

1. **Princípio da Responsabilidade Única**: Cada componente, hook e serviço tem uma responsabilidade clara e singular.
2. **Princípio Aberto/Fechado**: Componentes e hooks podem ser estendidos através de props e lógica, sem modificar sua estrutura existente.
3. **Inversão de Dependência**: Serviços externos são abstraídos dentro da camada de serviços, garantindo que os componentes permaneçam focados na lógica de UI.

## Gerenciamento de Estado

A maior parte do estado é gerenciada localmente usando `useState` e hooks personalizados. Para as configurações de tema e idioma, o Zustand é usado para gerenciar esses estados globalmente, facilitando a alternância entre temas e idiomas sem causar re-renderizações desnecessárias ou complexidade.

## Acessibilidade e Testes

A acessibilidade foi priorizada durante o desenvolvimento, com foco em garantir a acessibilidade por teclado e o uso adequado de ARIA labels. A abordagem de testes foi a seguinte:

- **Testes de Renderização**: Garantiu que os componentes fossem renderizados conforme o esperado em ambos os temas.
- **Testes de Tema**: Verificou que os componentes lidavam corretamente com temas claro e escuro.
- **Test

