import { AppRouter } from '@routes/router'
import { useAppStore } from '@store/app'
import { render, screen } from '@testing-library/react'
import { useTranslation } from 'react-i18next'

// Mock da store e do hook useTranslation
jest.mock('@store/app')
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

// Mock da Homepage
jest.mock('@pages/home/Homepage', () => ({
  Homepage: () => <div>Homepage</div>,
}))

describe('AppRouter', () => {
  beforeEach(() => {
    // Limpar mocks e localStorage antes de cada teste
    localStorage.clear()
    jest.clearAllMocks()
  })

  test('deve renderizar a página inicial corretamente', () => {
    // Simular o valor inicial do estado da store
    ;(useAppStore as unknown as jest.Mock).mockReturnValue({
      lang: 'en', // Valor padrão
    })

    // Mock da função useTranslation e de seus valores
    ;(useTranslation as jest.Mock).mockReturnValue({
      i18n: {
        language: 'en',
        changeLanguage: jest.fn(),
      },
    })

    render(<AppRouter />)

    // Verificar se a Homepage é renderizada corretamente
    expect(screen.getByText('Homepage')).toBeInTheDocument()
  })

  test('deve alterar o idioma corretamente quando lang na store muda', async () => {
    // Simular o valor da store com lang 'pt-BR'
    const mockChangeLanguage = jest.fn()
    ;(useAppStore as unknown as jest.Mock).mockReturnValue({
      lang: 'pt-BR',
    })

    // Mock da função useTranslation
    ;(useTranslation as jest.Mock).mockReturnValue({
      i18n: {
        language: 'en', // O idioma atual é 'en', mas deve mudar para 'pt-BR'
        changeLanguage: mockChangeLanguage,
      },
    })

    render(<AppRouter />)

    // Verificar se a função changeLanguage foi chamada corretamente
    expect(mockChangeLanguage).toHaveBeenCalledWith('pt-BR')
  })

  test('não deve alterar o idioma se lang e language forem iguais', async () => {
    // Simular o valor da store com lang 'en'
    const mockChangeLanguage = jest.fn()
    ;(useAppStore as unknown as jest.Mock).mockReturnValue({
      lang: 'en',
    })

    // Mock da função useTranslation com idioma igual ao valor de lang
    ;(useTranslation as jest.Mock).mockReturnValue({
      i18n: {
        language: 'en', // Mesmo valor que lang
        changeLanguage: mockChangeLanguage,
      },
    })

    render(<AppRouter />)

    // Verificar que a função changeLanguage não foi chamada
    expect(mockChangeLanguage).not.toHaveBeenCalled()
  })
})
