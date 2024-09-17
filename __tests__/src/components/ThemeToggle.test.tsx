import ThemeToggle from '@components/ThemeToggle'
import { useAppStore } from '@store/app'
import { axe, toHaveNoViolations } from 'jest-axe'
import { fireEvent, render, screen } from '../../utils/test-utils'

expect.extend(toHaveNoViolations)

jest.mock('@store/app', () => ({
  useAppStore: jest.fn(),
}))

describe('ThemeToggle Component', () => {
  const mockSetTheme = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders the Sun icon when the theme is 'dark'", () => {
    ;(useAppStore as unknown as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    })

    render(<ThemeToggle />)

    expect(screen.getByLabelText('toggle theme')).toBeInTheDocument()
    expect(
      screen.getByLabelText('toggle theme').querySelector('svg'),
    ).toBeInTheDocument()
  })

  test("renders the Moon icon when the theme is 'light'", () => {
    ;(useAppStore as unknown as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    })

    render(<ThemeToggle />)

    expect(screen.getByLabelText('toggle theme')).toBeInTheDocument()
    expect(
      screen.getByLabelText('toggle theme').querySelector('svg'),
    ).toBeInTheDocument()
  })

  test("toggles the theme from 'dark' to 'light' when clicked", () => {
    ;(useAppStore as unknown as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    })

    render(<ThemeToggle />)

    const button = screen.getByLabelText('toggle theme')

    fireEvent.click(button)

    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  test("toggles the theme from 'light' to 'dark' when clicked", () => {
    ;(useAppStore as unknown as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    })

    render(<ThemeToggle />)

    const button = screen.getByLabelText('toggle theme')

    fireEvent.click(button)

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  test("has the correct 'aria-label' attribute", () => {
    ;(useAppStore as unknown as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    })

    render(<ThemeToggle />)

    expect(screen.getByLabelText('toggle theme')).toBeInTheDocument()
  })

  test('is accessible', async () => {
    ;(useAppStore as unknown as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    })

    const { container } = render(<ThemeToggle />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
