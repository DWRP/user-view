# Architecture

This document outlines the architectural decisions and patterns used in the User List App.

[![Versão em Português](https://img.shields.io/badge/architecture-PT--BR-blue)](./ARCHITECTURE.pt.md)

## Project Structure

The project follows a simple but effective structure, avoiding over-engineering. Although Clean Architecture was initially considered, it was determined that the current structure fits the needs of the project without unnecessary complexity. Any future structural changes will be made with proper team evaluation.

### Components Layer

Located in `src/components`, this layer contains:

- UI components, both styled and non-styled.
- Organism and molecule components are built here, while atoms and lower-level styled components are kept in `src/components/styled` to extend the React Aria components.

### Hooks Layer

Located in `src/hooks`, this layer contains:

- Custom hooks that encapsulate specific logic for the UI and state management.

### Services Layer

Located in `src/services`, this layer contains:

- External API interactions and data-fetching logic.

### Store Layer

The `src/store` layer is used for managing global states, such as theme and language preferences. Zustand is used to persist and retrieve these states.

### Themes Layer

Located in `src/themes`, this layer contains:

- Theme-related configurations, including dark and light themes, as well as global styles.

## Design Patterns and Decisions

Although the project is relatively simple, several design principles and patterns were adopted:

1. **Component-Based Design**: Components are divided into styled atoms and higher-level molecules and organisms for clear separation of concerns.
2. **Zustand for Global State**: Used for managing themes and language, ensuring that future feature additions (e.g., multilingual support) are easy to implement.
3. **Styled Components**: Styled components are created to extend React Aria components when the default style did not meet design requirements.

## SOLID Principles

1. **Single Responsibility Principle**: Each component, hook, and service has a clearly defined, singular responsibility.
2. **Open/Closed Principle**: Components and hooks can be extended through props and logic without modifying their existing structure.
3. **Dependency Inversion**: External services are abstracted within the services layer, ensuring that components remain focused on UI logic.

## State Management

The majority of the state is managed locally using `useState` and custom hooks. For theme and language settings, Zustand is used to manage these globally, making it easier to toggle themes and languages without causing re-renders or complexity.

## Accessibility and Testing

Accessibility was prioritized during development, with a focus on ensuring keyboard accessibility and proper ARIA labels. The following testing approach was used:

- **Rendering Tests**: Ensured components rendered as expected across themes.
- **Theme Tests**: Verified that the components correctly handled both light and dark themes.
- **Accessibility Tests**: Using `jest-axe`, accessibility checks were performed, ensuring the components met WCAG standards.
  - While simulating keyboard accessibility tests proved difficult (due to technical issues), manual testing showed that components were accessible via keyboard.

## Styling

The project uses Styled Components, especially for extending React Aria components when the default styles did not meet design needs. Components that are more complex or serve as higher-level containers were placed in `src/components`, while lower-level, styled atoms were placed in `src/components/styled`.

## Build and Deployment

RSBuild is used for building the application, providing optimizations for production. The application is deployed on Vercel, leveraging continuous integration and delivery.

## Future Considerations

1. Implement caching strategies for API requests.
2. Add error boundaries for better error handling.
3. Explore lazy loading for optimized performance.
4. Consider server-side rendering for improved SEO and initial load performance.

This architecture provides a flexible, scalable, and maintainable foundation for the application, while leaving room for future growth and optimizations.
