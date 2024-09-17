import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { storage } from './storage.service'

type Theme = 'light' | 'dark'

type Locale = 'en' | 'pt-BR'

interface AppState {
  theme: Theme
  lang?: Locale
  setTheme: (theme: Theme) => void
  setLocale: (lang: Locale) => void
}

export const useAppStore = create(
  persist<AppState>(
    (set) => ({
      theme: 'dark',
      lang: 'pt-BR',
      setTheme: (theme: Theme) => {
        document.documentElement.setAttribute('data-theme', theme)
        set({ theme })
      },
      setLocale: (lang: Locale) => {
        set({ lang })
      },
    }),
    {
      name: 'app',
      storage: storage(),
    },
  ),
)
