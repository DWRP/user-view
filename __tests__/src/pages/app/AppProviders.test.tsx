import { AppProviders } from '@pages/app/AppProviders'
import { useAppStore } from '@store/app'
import { render, screen } from '@testing-library/react'
import { darkTheme, lightTheme } from '@themes/theme'
import { axe, toHaveNoViolations } from 'jest-axe'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import 'jest-styled-components'

expect.extend(toHaveNoViolations)

jest.mock('@store/app')

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  I18nextProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}))

const ThemedDiv = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`

const TranslatedComponent = () => {
  const { t } = useTranslation()
  return <div>{t('homepage.title')}</div>
}

describe('AppProviders Component', () => {
  const mockUseAppStore = useAppStore as unknown as jest.Mock

  const renderWithProviders = (children: ReactNode) => {
    return render(<AppProviders>{children}</AppProviders>)
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test.each([
    ['dark', darkTheme],
    ['light', lightTheme],
  ])('should apply %s theme to a styled component', (_, theme) => {
    mockUseAppStore.mockReturnValue({ theme: _ })

    renderWithProviders(
      <ThemedDiv data-testid="themed-element">Content</ThemedDiv>,
    )
    const themedElement = screen.getByTestId('themed-element')

    expect(themedElement).toHaveStyleRule('background-color', theme.background)
  })

  test('should render translated text with useTranslation', () => {
    mockUseAppStore.mockReturnValue({ theme: 'light' })

    renderWithProviders(<TranslatedComponent />)

    expect(screen.getByText('homepage.title')).toBeInTheDocument()
  })

  test('should be accessible', async () => {
    mockUseAppStore.mockReturnValue({ theme: 'light' })

    const { container } = renderWithProviders(
      <ThemedDiv>Accessible Content</ThemedDiv>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
