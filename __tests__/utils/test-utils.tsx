import { type RenderOptions, render as rtlRender } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { type DefaultTheme, ThemeProvider } from 'styled-components' // Ajuste conforme seus temas

type ProviderType = ({ children }: { children: ReactNode }) => JSX.Element

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: DefaultTheme
  providers?: ProviderType
}

const withTheme = (ui: ReactElement, theme?: DefaultTheme) => {
  return theme ? <ThemeProvider theme={theme}>{ui}</ThemeProvider> : ui
}

const withProviders = (ui: ReactElement, Providers?: ProviderType) => {
  return Providers ? <Providers>{ui}</Providers> : ui
}

function render(
  ui: ReactElement,
  { theme, providers, ...options }: CustomRenderOptions = {},
) {
  const uiWithTheme = withTheme(ui, theme)
  const uiWithProviders = withProviders(uiWithTheme, providers)

  return rtlRender(uiWithProviders, options)
}

export * from '@testing-library/react'
export { render }
