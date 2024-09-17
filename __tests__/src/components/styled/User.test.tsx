import { User } from '@components/styled/User'
import { render } from '../../../utils/test-utils'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import { darkTheme, lightTheme } from '@themes/theme' // Importando os temas
import { axe, toHaveNoViolations } from 'jest-axe'
import type { DefaultTheme } from 'styled-components'

expect.extend(toHaveNoViolations)

const renderUserCard = (theme: DefaultTheme) => {
  return render(
    <User.Card>
      <User.Name>John Doe</User.Name>
      <User.Info>Email: john@example.com</User.Info>
      <User.Link href="mailto:john@example.com">Contact</User.Link>
    </User.Card>,
    { theme },
  )
}

describe('User Component', () => {
  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should apply correct styles in Card with %s theme', (_, theme) => {
    const { container } = renderUserCard(theme)
    const card = container.firstChild

    expect(card).toBeInTheDocument()
    expect(card).toHaveStyleRule('background-color', theme.cardBackground)
    expect(card).toHaveStyleRule('box-shadow', theme.boxShadow)
    expect(card).toHaveStyleRule('border-radius', '0.5rem')
  })

  test('should apply correct styles in UserName', () => {
    const { getByText } = render(
      <User.Card>
        <User.Name>John Doe</User.Name>
      </User.Card>,
      { theme: lightTheme },
    )

    const userName = getByText('John Doe')

    expect(userName).toBeInTheDocument()
    expect(userName).toHaveStyleRule('font-size', '1.25rem')
    expect(userName).toHaveStyleRule('font-weight', '600')
    expect(userName).toHaveStyleRule('color', lightTheme.text)
  })

  test('should apply correct styles in UserInfo', () => {
    const { getByText } = render(
      <User.Card>
        <User.Info>Email: john@example.com</User.Info>
      </User.Card>,
      { theme: lightTheme },
    )

    const userInfo = getByText('Email: john@example.com')

    expect(userInfo).toBeInTheDocument()
    expect(userInfo).toHaveStyleRule('font-size', '0.875rem')
    expect(userInfo).toHaveStyleRule('color', lightTheme.textSecondary)
  })

  test('should apply correct styles in Link with light theme', () => {
    const { getByText } = render(
      <User.Card>
        <User.Link href="mailto:john@example.com">Contact</User.Link>
      </User.Card>,
      { theme: lightTheme },
    )

    const link = getByText('Contact')

    expect(link).toBeInTheDocument()
    expect(link).toHaveStyleRule('color', lightTheme.primary)
    expect(link).toHaveStyleRule('text-decoration', 'none')

    expect(link).toHaveStyleRule('text-decoration', 'underline', {
      modifier: ':hover',
    })
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should be accessible with %s theme', async (_, theme) => {
    const { container } = renderUserCard(theme)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
