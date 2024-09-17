import { Language } from '@components/styled/Language'
import { fireEvent, render, screen } from '../../../utils/test-utils'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import { darkTheme, lightTheme } from '@themes/theme'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ListBox } from 'react-aria-components'
import type { DefaultTheme } from 'styled-components'

expect.extend(toHaveNoViolations)

const renderLanguageComponent = (theme: DefaultTheme) => {
  return render(
    <Language.Select aria-label="Language selection">
      <Language.Button>Select language</Language.Button>
      <Language.Popover aria-label="Language popover">
        <ListBox aria-label="List of languages">
          <Language.ListBoxItem id="pt-BR">PT</Language.ListBoxItem>
          <Language.ListBoxItem id="en">EN</Language.ListBoxItem>
        </ListBox>
      </Language.Popover>
    </Language.Select>,
    { theme },
  )
}

const verifyPopoverStyles = (listbox: HTMLElement, theme: DefaultTheme) => {
  expect(listbox.parentElement).toHaveStyleRule('position', 'absolute')
  expect(listbox.parentElement).toHaveStyleRule(
    'background-color',
    theme.inputBackground,
  )
  expect(listbox.parentElement).toHaveStyleRule('color', theme.inputText)
  expect(listbox.parentElement).toHaveStyleRule(
    'border',
    `1px solid ${theme.borderColor}`,
  )
  expect(listbox.parentElement).toHaveStyleRule('box-shadow', theme.boxShadow)
}

describe('Language Component', () => {
  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should render SelectStyled with %s theme', (_, theme) => {
    const { container } = renderLanguageComponent(theme)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild).toHaveStyleRule('position', 'relative')
    expect(container.firstChild).toHaveStyleRule('width', '72px')
    expect(container.firstChild).toHaveStyleRule('height', '48px')
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])(
    'should apply correct styles to ButtonStyled with %s theme',
    (_, theme) => {
      const { container } = renderLanguageComponent(theme)

      expect(container.firstChild).toBeInTheDocument()
      expect(container.firstChild?.firstChild).toHaveStyleRule(
        'display',
        'flex',
      )
      expect(container.firstChild?.firstChild).toHaveStyleRule(
        'background-color',
        theme.inputBackground,
      )
      expect(container.firstChild?.firstChild).toHaveStyleRule(
        'color',
        theme.inputText,
      )
      expect(container.firstChild?.firstChild).toHaveStyleRule(
        'border',
        `2px solid ${theme.inputBorder}`,
      )
    },
  )

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])(
    'should apply correct styles to PopoverStyled with %s theme',
    (_, theme) => {
      renderLanguageComponent(theme)

      const selectButton = screen.getByRole('button', {
        name: /language selection/i,
      })
      fireEvent.click(selectButton)

      const listbox = screen.getByRole('listbox')
      expect(listbox).toBeInTheDocument()

      verifyPopoverStyles(listbox, theme)
    },
  )

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should be accessible with %s theme', async (_, theme) => {
    const { container } = renderLanguageComponent(theme)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
