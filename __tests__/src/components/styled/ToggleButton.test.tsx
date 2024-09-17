import { ToggleButton } from '@components/styled/ToggleButton'
import { act, render } from '../../../utils/test-utils'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import { darkTheme, lightTheme } from '@themes/theme'
import { axe, toHaveNoViolations } from 'jest-axe'
import type { DefaultTheme } from 'styled-components'

expect.extend(toHaveNoViolations)

const renderToggleButton = (theme: DefaultTheme) => {
  return render(
    <ToggleButton aria-label="toggle-button">Toggle</ToggleButton>,
    { theme },
  )
}

describe('ToggleButton Component', () => {
  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should apply correct styles with %s theme', (_, theme) => {
    const { getByRole } = renderToggleButton(theme)
    const button = getByRole('button', { name: /toggle-button/i })

    expect(button).toBeInTheDocument()
    expect(button).toHaveStyleRule('background-color', theme.inputBackground)
    expect(button).toHaveStyleRule('color', theme.inputText)
    expect(button).toHaveStyleRule('border', `2px solid ${theme.inputBorder}`)
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should apply correct focus styles with %s theme', (_, theme) => {
    const { getByRole } = renderToggleButton(theme)
    const button = getByRole('button', { name: /toggle-button/i })

    act(() => {
      button.focus()
    })

    expect(button).toHaveStyleRule('border', `2px solid ${theme.primary}`, {
      modifier: ':focus',
    })
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should be accessible with %s theme', async (_, theme) => {
    const { container } = renderToggleButton(theme)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
