import { useUsers } from '@hooks/useUsers' // Importar o hook
import { UserService } from '@services/UserService' // Importar o serviço
import { render, screen } from '@testing-library/react'
import { act } from 'react'

// Mock da função fetchUsers no UserService
jest.mock('@services/UserService')

// Componente para testar o hook useUsers
const HookTestComponent = () => {
  const { users, isLoading, error } = useUsers()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

describe('useUsers hook', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('deve iniciar com o estado de carregamento (isLoading)', async () => {
    // Simulando uma chamada vazia para fetchUsers
    ;(UserService.fetchUsers as jest.Mock).mockResolvedValue([])

    render(<HookTestComponent />)

    // Verificar o estado inicial de isLoading
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    // Simular o fim do carregamento e renderizar novamente
    await act(async () => {
      await Promise.resolve()
    })

    // Verificar que não está mais carregando
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })

  test('deve retornar os usuários corretamente após o carregamento', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '987-654-3210',
      },
    ]

    // Simulando a resposta do fetchUsers com dados de usuários
    ;(UserService.fetchUsers as jest.Mock).mockResolvedValue(mockUsers)

    render(<HookTestComponent />)

    // Simular o fim do carregamento e renderizar novamente
    await act(async () => {
      await Promise.resolve()
    })

    // Verificar se os usuários foram renderizados corretamente
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })

  test('deve lidar com erro durante a chamada de fetchUsers', async () => {
    const mockError = new Error('Failed to fetch users')

    // Simulando um erro na chamada de fetchUsers
    ;(UserService.fetchUsers as jest.Mock).mockRejectedValue(mockError)

    render(<HookTestComponent />)

    // Simular o fim do carregamento e renderizar novamente
    await act(async () => {
      await Promise.resolve()
    })

    // Verificar se o erro foi capturado e exibido
    expect(screen.getByText(`Error: ${mockError.message}`)).toBeInTheDocument()
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })
})
