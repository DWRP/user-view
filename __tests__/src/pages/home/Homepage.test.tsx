import { useUsers } from '@hooks/useUsers'
import { Homepage } from '@pages/home/Homepage'
import { axe, toHaveNoViolations } from 'jest-axe'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '../../../utils/test-utils'

expect.extend(toHaveNoViolations)

jest.mock('@hooks/useUsers')

describe('Homepage', () => {
  const mockUseUsers = useUsers as jest.Mock

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.clearAllMocks()
  })

  afterEach(() => {
    ;(console.warn as jest.Mock).mockRestore()
  })

  const renderHomepage = () => {
    return render(<Homepage />, { providers: MemoryRouter })
  }

  test('renders loading content when loading', () => {
    mockUseUsers.mockReturnValue({
      users: [],
      isLoading: true,
      error: null,
    })

    renderHomepage()

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('renders error message when an error occurs', () => {
    mockUseUsers.mockReturnValue({
      users: [],
      isLoading: false,
      error: { message: 'Failed to load' },
    })

    renderHomepage()

    expect(
      screen.getByText('Error loading users: Failed to load'),
    ).toBeInTheDocument()
  })

  test("renders 'No users found' message when no users are returned", () => {
    mockUseUsers.mockReturnValue({
      users: [],
      isLoading: false,
      error: null,
    })

    renderHomepage()

    expect(screen.getByText('No users found.')).toBeInTheDocument()
  })

  test('renders UsersCardGrid when users are present and isCardView is true', () => {
    mockUseUsers.mockReturnValue({
      users: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
        },
      ],
      isLoading: false,
      error: null,
    })

    renderHomepage()

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  test('renders UserTable when users are present and isCardView is false', () => {
    mockUseUsers.mockReturnValue({
      users: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
        },
      ],
      isLoading: false,
      error: null,
    })

    renderHomepage()

    const toggleButton = screen.getByText('homepage.cardView')
    fireEvent.click(toggleButton)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  test('is accessible', async () => {
    mockUseUsers.mockReturnValue({
      users: [],
      isLoading: true,
      error: null,
    })

    const { container } = renderHomepage()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
