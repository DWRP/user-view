import { useAppStore } from '@store/app'
import { Moon, Sun } from 'lucide-react'
import { ToggleButton } from './styled/ToggleButton'

export default function ThemeToggle() {
  const { theme, setTheme } = useAppStore()

  return (
    <ToggleButton
      onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="toggle theme"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </ToggleButton>
  )
}
