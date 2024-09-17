import UsersCardGrid from '@components/UsersCardGrid'
import type { User } from '@services/UserService'
import { axe, toHaveNoViolations } from 'jest-axe'
import { render, screen } from '../../utils/test-utils'

expect.extend(toHaveNoViolations)

jest.mock('@components/UserCard', () => ({ user }: { user: User }) => (
  <div data-testid="user-card">
    <p>{user.name}</p>
  </div>
))

describe('UsersCardGrid Component', () => {
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '987-654-3210',
    },
  ]

  test('renders the correct number of UserCards', () => {
    render(<UsersCardGrid users={mockUsers} />)

    const userCards = screen.getAllByTestId('user-card')
    expect(userCards.length).toBe(mockUsers.length)
  })

  test('passes the correct props to UserCard', () => {
    render(<UsersCardGrid users={mockUsers} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })

  test('is accessible', async () => {
    const { container } = render(<UsersCardGrid users={mockUsers} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
