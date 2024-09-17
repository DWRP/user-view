import { LanguageSelect } from '@components/LanguageSelect'
import { useAppStore } from '@store/app'
import userEvent from '@testing-library/user-event'
import { darkTheme, lightTheme } from '@themes/theme'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useTranslation } from 'react-i18next'
import type { DefaultTheme } from 'styled-components' // Import only types
import { render, screen, within } from '../../utils/test-utils'

expect.extend(toHaveNoViolations)

// Mock dependencies
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

jest.mock('@store/app', () => ({
  useAppStore: jest.fn(),
}))

describe('LanguageSelect', () => {
  const mockChangeLanguage = jest.fn()
  const mockSetLocale = jest.fn()

  // Consolidating mock setup
  const setupMocks = () => {
    ;(useAppStore as unknown as jest.Mock).mockReturnValue({
      setLocale: mockSetLocale,
    })
    ;(useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
      i18n: {
        language: 'en',
        changeLanguage: mockChangeLanguage,
      },
    })
  }

  beforeEach(() => {
    jest.clearAllMocks()
    setupMocks()
  })

  const renderComponent = (theme: DefaultTheme) =>
    render(<LanguageSelect />, { theme })

  // Test cases using themes from @themes/theme
  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('renders without crashing with %s theme', (_, theme) => {
    renderComponent(theme)
    expect(screen.getByLabelText('language select')).toBeInTheDocument()
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('displays the current language with %s theme', (_, theme) => {
    renderComponent(theme)
    expect(screen.getByRole('button')).toHaveTextContent('EN')
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])(
    'opens the language options when clicked with %s theme',
    async (_, theme) => {
      renderComponent(theme)
      const button = screen.getByRole('button')
      await userEvent.click(button)

      const listbox = screen.getByRole('listbox')
      expect(listbox).toBeVisible()
      expect(within(listbox).getByText('PT')).toBeInTheDocument()
      expect(within(listbox).getByText('EN')).toBeInTheDocument()
    },
  )

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])(
    'changes the language when a new option is selected with %s theme',
    async (_, theme) => {
      renderComponent(theme)
      const button = screen.getByRole('button', { name: /language select/i })
      await userEvent.click(button)

      const listbox = screen.getByRole('listbox')
      const ptOption = within(listbox).getByRole('option', { name: /pt/i })
      await userEvent.click(ptOption)

      expect(mockSetLocale).toHaveBeenCalledWith('pt-BR')
      expect(mockChangeLanguage).toHaveBeenCalledWith('pt-BR')
    },
  )

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('has proper ARIA attributes with %s theme', (_, theme) => {
    renderComponent(theme)
    const select = screen.getByLabelText('language select')
    expect(select).toHaveAttribute('aria-label', 'language select')

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-haspopup', 'listbox')
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('is responsive with %s theme', (_, theme) => {
    const { container } = renderComponent(theme)
    const select = container.firstChild as HTMLElement

    expect(select).toHaveStyle('width: 72px')
    expect(select).toHaveStyle('height: 48px')
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('is accessible with %s theme', async (_, theme) => {
    const { container } = renderComponent(theme)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
