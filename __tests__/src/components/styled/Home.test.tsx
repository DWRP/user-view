import { Home } from '@components/styled/Home'
import { render } from '../../../utils/test-utils'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import { darkTheme, lightTheme } from '@themes/theme'
import { axe, toHaveNoViolations } from 'jest-axe'
import type { DefaultTheme } from 'styled-components'

expect.extend(toHaveNoViolations)

const renderHomeContainer = (theme: DefaultTheme) => {
  return render(<Home.Container />, { theme })
}

const renderHomeControls = (theme: DefaultTheme) => {
  return render(<Home.Controls />, { theme })
}

describe('Home Component', () => {
  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should render the Container without errors with %s theme', (_, theme) => {
    const { container } = renderHomeContainer(theme)
    expect(container.firstChild).toBeInTheDocument()
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should apply correct %s theme styles to Container', (_, theme) => {
    const { container } = renderHomeContainer(theme)
    expect(container.firstChild).toHaveStyleRule('margin', '0 auto')
    expect(container.firstChild).toHaveStyleRule('padding', '1rem')
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      theme.background,
    )
    expect(container.firstChild).toHaveStyleRule('color', theme.text)
    expect(container.firstChild).toHaveStyleRule(
      'transition',
      'background-color 0.2s,color 0.2s',
    )
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should render the Controls without errors with %s theme', (_, theme) => {
    const { container } = renderHomeControls(theme)
    expect(container.firstChild).toBeInTheDocument()
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])(
    'should apply the correct styles to Controls with %s theme',
    (_, theme) => {
      const { container } = renderHomeControls(theme)
      expect(container.firstChild).toHaveStyleRule('display', 'flex')
      expect(container.firstChild).toHaveStyleRule('flex-direction', 'column')

      // TODO: Add a way to test `media queries`. Approach below with error.
      // Media query: flex-direction changes at min-width 640px
      // expect(container.firstChild).toHaveStyleRule("flex-direction", "row", {
      //   media: "(min-width: 640px)",
      // });
      expect(container.firstChild).toHaveStyleRule(
        'justify-content',
        'space-between',
      )
      expect(container.firstChild).toHaveStyleRule('align-items', 'flex-end')
      expect(container.firstChild).toHaveStyleRule('gap', '1rem')
      expect(container.firstChild).toHaveStyleRule('margin-bottom', '1.5rem')
    },
  )

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should be accessible with %s theme', async (_, theme) => {
    const { container } = renderHomeContainer(theme)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
