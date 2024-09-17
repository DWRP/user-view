import { useAppStore } from '@store/app' // Seu hook a ser testado
import { act } from 'react'
import { render, screen } from '../../utils/test-utils'

function HookTestComponent() {
  const { theme, setTheme, lang, setLocale } = useAppStore()

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button type="button" onClick={() => setTheme('light')}>
        Set Light Theme
      </button>
      <button type="button" onClick={() => setTheme('dark')}>
        Set Dark Theme
      </button>
      <p>Current lang: {lang || 'not set'}</p>{' '}
      {/* Valor padrão se lang for undefined */}
      <button type="button" onClick={() => setLocale('en')}>
        Set EN lang
      </button>
      <button type="button" onClick={() => setLocale('pt-BR')}>
        Set PT lang
      </button>
    </div>
  )
}

describe('useAppStore', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('deve iniciar com o estado padrão', () => {
    render(<HookTestComponent />)
    expect(screen.getByText(/Current theme: dark/i)).toBeInTheDocument()
    expect(screen.getByText(/Current lang: not set/i)).toBeInTheDocument() // Mudado para "not set"
  })

  test('deve alterar o tema corretamente', () => {
    render(<HookTestComponent />)

    // Atualizar o tema para 'light'
    act(() => {
      screen.getByText('Set Light Theme').click()
    })

    // Verificar se o tema foi atualizado
    expect(screen.getByText(/Current theme: light/i)).toBeInTheDocument()
  })

  test('deve alterar o tema para dark corretamente', () => {
    render(<HookTestComponent />)

    // Atualizar o tema para 'light' primeiro
    act(() => {
      screen.getByText('Set Light Theme').click()
    })

    // Verificar se o tema foi atualizado para 'light'
    expect(screen.getByText(/Current theme: light/i)).toBeInTheDocument()

    // Atualizar o tema para 'dark'
    act(() => {
      screen.getByText('Set Dark Theme').click()
    })

    // Verificar se o tema foi atualizado para 'dark'
    expect(screen.getByText(/Current theme: dark/i)).toBeInTheDocument()
  })

  test('deve alterar o idioma para EN corretamente', () => {
    render(<HookTestComponent />)

    // Atualizar o idioma para 'en'
    act(() => {
      screen.getByText('Set EN lang').click()
    })

    // Verificar se o idioma foi atualizado
    expect(screen.getByText(/Current lang: en/i)).toBeInTheDocument()
  })

  test('deve alterar o idioma para PT-BR corretamente', () => {
    render(<HookTestComponent />)

    // Atualizar o idioma para 'pt-BR'
    act(() => {
      screen.getByText('Set PT lang').click()
    })

    // Verificar se o idioma foi atualizado
    expect(screen.getByText(/Current lang: pt-BR/i)).toBeInTheDocument()
  })
})
