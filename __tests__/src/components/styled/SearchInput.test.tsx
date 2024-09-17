import { SearchInput } from '@components/styled/SearchInput'
import { act, render } from '../../../utils/test-utils'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import { darkTheme, lightTheme } from '@themes/theme'
import { axe, toHaveNoViolations } from 'jest-axe'
import type { DefaultTheme } from 'styled-components'

expect.extend(toHaveNoViolations)

const renderSearchInput = (theme: DefaultTheme) => {
  return render(<SearchInput aria-label="Search input" />, { theme })
}

describe('SearchInput Component', () => {
  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should apply correct styles with %s theme', (_, theme) => {
    const { container } = renderSearchInput(theme)
    const input = container.firstChild

    expect(input).toBeInTheDocument()
    expect(input).toHaveStyleRule('background-color', theme.inputBackground)
    expect(input).toHaveStyleRule('color', theme.inputText)
    expect(input).toHaveStyleRule('border', `1px solid ${theme.inputBorder}`)
    expect(input).toHaveStyleRule('padding', '0.8rem')
    expect(input).toHaveStyleRule('max-width', '256px')
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should apply correct focus styles with %s theme', (_, theme) => {
    const { getByRole } = renderSearchInput(theme)
    const input = getByRole('textbox')

    act(() => {
      input.focus()
    })

    expect(input).toHaveStyleRule('outline', 'none', { modifier: ':focus' })
    expect(input).toHaveStyleRule('border-color', theme.primary, {
      modifier: ':focus',
    })
    expect(input).toHaveStyleRule('box-shadow', `0 0 0 2px ${theme.primary}`, {
      modifier: ':focus',
    })
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should be accessible with %s theme', async (_, theme) => {
    const { container } = renderSearchInput(theme)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
