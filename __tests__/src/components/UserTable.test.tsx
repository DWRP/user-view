import UserTable from '@components/UserTable'
import type { User } from '@services/UserService'
import { axe, toHaveNoViolations } from 'jest-axe'
import { render, screen } from '../../utils/test-utils'

expect.extend(toHaveNoViolations)

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'homepage.table.name': 'Name',
        'homepage.table.email': 'Email',
        'homepage.table.phone': 'Phone',
      }
      return translations[key] || key
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}))

describe('UserTable Component', () => {
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

  test('renders the table headers correctly', () => {
    render(<UserTable users={mockUsers} />)

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Phone')).toBeInTheDocument()
  })

  test('renders the table rows with the correct data', () => {
    render(<UserTable users={mockUsers} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('123-456-7890')).toBeInTheDocument()

    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.getByText('987-654-3210')).toBeInTheDocument()
  })

  test('applies the correct accessibility attributes', () => {
    render(<UserTable users={mockUsers} />)

    expect(screen.getByLabelText('user-table-container')).toBeInTheDocument()
    expect(screen.getByLabelText('user-table')).toBeInTheDocument()
  })

  test('is accessible', async () => {
    const { container } = render(<UserTable users={mockUsers} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
