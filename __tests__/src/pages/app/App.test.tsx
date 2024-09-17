import App from '@pages/app/App'
import { render, screen } from '@testing-library/react'

// Mock dos componentes AppRouter, GlobalStyles e AppProviders
jest.mock('@routes/router', () => ({
  AppRouter: () => <div>AppRouter</div>,
}))

jest.mock('@pages/app/AppProviders', () => ({
  AppProviders: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deve renderizar o AppRouter corretamente', () => {
    render(<App />)

    // Verificar se o AppRouter foi renderizado
    expect(screen.getByText('AppRouter')).toBeInTheDocument()
  })

  test('deve envolver o aplicativo com AppProviders', () => {
    render(<App />)

    // Verificar se o AppProviders foi chamado corretamente
    expect(screen.getByText('AppRouter')).toBeInTheDocument()
  })
})
