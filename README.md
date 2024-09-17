# User List App

![Vercel](https://vercelbadge.vercel.app/api/dwrp/user-view)
![Version](https://img.shields.io/github/package-json/v/dwrp/user-view)
![Lighthouse Score](https://img.shields.io/badge/lighthouse-100%2F100-brightgreen)
[![Versão em Português](https://img.shields.io/badge/readme-PT--BR-blue)](./docs/README.pt.md)

A simple Single Page Application (SPA) built with React that displays a list of users fetched from a public API.

## Features

- Fetch and display user data from JSONPlaceholder API
- Toggle between card and table view
- Search functionality with URL persistence
- Responsive design
- Accessible UI components using React Aria Components

## Technologies Used

- ReactJS
- React Router DOM
- Styled Components
- React Aria Components
- RSBuild
- TypeScript
- Testing Library
- Jest

## Setup

Install the dependencies:

```bash
# pnpm, yarn, or npm
pnpm install
yarn install
npm install
```

## Get Started

Start the dev server:

```bash
# pnpm, yarn, or npm
pnpm dev
yarn dev
npm run dev
```

## Build for Production

Build the app for production:

```bash
# pnpm, yarn, or npm
pnpm build
yarn build
npm run build
```

## Preview the Production Build

Preview the production build locally:

```bash
# pnpm, yarn, or npm
pnpm preview
yarn preview
npm run preview
```

## Project Structure

The project follows a clean architecture approach, separating concerns into different layers:

- `components`: Contains all the React components, styled and functional.
- `hooks`: Contains custom hooks for managing state and business logic.
- `services`: Contains service classes for interacting with external APIs.
- `store`: Manages centralized state (if applicable).
- `themes`: Contains the global and component-specific theming using Styled Components.

For more details on the architecture, please refer to the [ARCHITECTURE.md](./docs/ARCHITECTURE.md) file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
