import i18n from '@i18n'
import { useAppStore } from '@store/app'
import { darkTheme, lightTheme } from '@themes/theme'
import type { PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from 'styled-components'

export const AppProviders = ({ children }: PropsWithChildren) => {
  const { theme } = useAppStore()
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </ThemeProvider>
  )
}
