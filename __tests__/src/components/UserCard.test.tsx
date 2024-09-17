import UserCard from '@components/UserCard'
import type { User } from '@services/UserService'
import { axe, toHaveNoViolations } from 'jest-axe'
import { render, screen } from '../../utils/test-utils'

expect.extend(toHaveNoViolations)

describe('UserCard Component', () => {
  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
  }

  test('renders name, email, and phone correctly', () => {
    render(<UserCard user={mockUser} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()

    const emailLink = screen.getByText('john@example.com')
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:john@example.com')

    const phoneLink = screen.getByText('123-456-7890')
    expect(phoneLink).toBeInTheDocument()
    expect(phoneLink).toHaveAttribute('href', 'tel:123-456-7890')
  })

  test('applies aria-label correctly', () => {
    render(<UserCard user={mockUser} />)

    const userCard = screen.getByLabelText('User card for John Doe')
    expect(userCard).toBeInTheDocument()
  })

  test('is accessible', async () => {
    const { container } = render(<UserCard user={mockUser} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
