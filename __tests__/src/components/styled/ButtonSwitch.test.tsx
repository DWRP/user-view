import { ButtonSwitch } from '@components/styled/ButtonSwitch'
import { render, screen } from '../../../utils/test-utils'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import { darkTheme, lightTheme } from '@themes/theme'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'
import type { DefaultTheme } from 'styled-components'

expect.extend(toHaveNoViolations)

const renderButtonSwitch = (theme: DefaultTheme) => {
  return render(<ButtonSwitch>Click Me</ButtonSwitch>, { theme })
}

describe('ButtonSwitch Component', () => {
  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should render without errors with %s theme', (_, theme) => {
    renderButtonSwitch(theme)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should apply the correct styles with %s theme', (_, theme) => {
    renderButtonSwitch(theme)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveStyleRule('display', 'flex')
    expect(button).toHaveStyleRule('align-items', 'center')
    expect(button).toHaveStyleRule('justify-content', 'center')
    expect(button).toHaveStyleRule('padding', '0.8rem')
    expect(button).toHaveStyleRule('background-color', theme.inputBackground)
    expect(button).toHaveStyleRule('color', theme.inputText)
    expect(button).toHaveStyleRule('border', `2px solid ${theme.inputBorder}`)
    expect(button).toHaveStyleRule('border-radius', '0.5rem')
    expect(button).toHaveStyleRule(
      'transition',
      'background-color 0.2s,color 0.2s',
    )
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should apply correct focus styles with %s theme', (_, theme) => {
    renderButtonSwitch(theme)
    const button = screen.getByRole('button', { name: /click me/i })

    act(() => {
      button.focus()
    })

    expect(button).toHaveStyleRule('outline', 'none', { modifier: ':focus' })
    expect(button).toHaveStyleRule('border', `2px solid ${theme.primary}`, {
      modifier: ':focus',
    })
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should be accessible with %s theme', async (_, theme) => {
    const { container } = renderButtonSwitch(theme)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
