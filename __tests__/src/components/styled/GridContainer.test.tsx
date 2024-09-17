import { GridContainer } from '@components/styled/GridContainer'
import { render } from '../../../utils/test-utils'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import { darkTheme, lightTheme } from '@themes/theme'
import { axe, toHaveNoViolations } from 'jest-axe'
import type { DefaultTheme } from 'styled-components'

expect.extend(toHaveNoViolations)

const renderGridContainer = (theme: DefaultTheme) => {
  return render(<GridContainer />, { theme })
}

describe('GridContainer Component', () => {
  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should render without errors with %s theme', (_, theme) => {
    const { container } = renderGridContainer(theme)
    expect(container.firstChild).toBeInTheDocument()
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should apply the correct grid styles with %s theme', (_, theme) => {
    const { container } = renderGridContainer(theme)
    expect(container.firstChild).toHaveStyleRule('display', 'grid')
    expect(container.firstChild).toHaveStyleRule('gap', '1rem')
    expect(container.firstChild).toHaveStyleRule(
      'grid-template-columns',
      'repeat(auto-fit, minmax(200px, 1fr))',
    )
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should be accessible with %s theme', async (_, theme) => {
    const { container } = renderGridContainer(theme)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
