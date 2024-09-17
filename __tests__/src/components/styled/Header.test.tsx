import { Header } from '@components/styled/Header'
import { render } from '../../../utils/test-utils'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import { darkTheme, lightTheme } from '@themes/theme'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from 'react-aria-components'
import type { DefaultTheme } from 'styled-components'

expect.extend(toHaveNoViolations)

const renderHeader = (theme: DefaultTheme) => {
  return render(
    <Header.Root>
      <Header.Title>My Header</Header.Title>
      <Header.Options>
        <Button>Option 1</Button>
        <Button>Option 2</Button>
      </Header.Options>
    </Header.Root>,
    { theme },
  )
}

describe('Header Component', () => {
  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should render without errors with %s theme', (_, theme) => {
    const { container } = renderHeader(theme)
    expect(container.firstChild).toBeInTheDocument()
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])(
    'should apply the correct styles to HeaderContainer with %s theme',
    (_, theme) => {
      const { container } = render(<Header.Root />, { theme })
      expect(container.firstChild).toHaveStyleRule('display', 'flex')
      expect(container.firstChild).toHaveStyleRule(
        'justify-content',
        'space-between',
      )
      expect(container.firstChild).toHaveStyleRule('align-items', 'center')
    },
  )

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should apply the correct styles to Title with %s theme', (_, theme) => {
    const { container } = render(<Header.Title>My Header</Header.Title>, {
      theme,
    })
    expect(container.firstChild).toHaveStyleRule('font-size', '2rem')
    expect(container.firstChild).toHaveStyleRule('font-weight', 'bold')
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])(
    'should apply the correct styles to HeaderOptions with %s theme',
    (_, theme) => {
      const { container } = render(<Header.Options />, { theme })
      expect(container.firstChild).toHaveStyleRule('display', 'flex')
      expect(container.firstChild).toHaveStyleRule('align-items', 'center')
      expect(container.firstChild).toHaveStyleRule(
        'justify-content',
        'space-around',
      )
      expect(container.firstChild).toHaveStyleRule('gap', '1rem')
    },
  )

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should be accessible with %s theme', async (_, theme) => {
    const { container } = renderHeader(theme)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
