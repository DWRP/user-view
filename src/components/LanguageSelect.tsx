import { Language } from '@components/styled/Language'
import { useAppStore } from '@store/app'
import { ChevronDown } from 'lucide-react'
import { type Key, ListBox, SelectValue } from 'react-aria-components'
import { useTranslation } from 'react-i18next'

export const LanguageSelect = () => {
  const { setLocale } = useAppStore()
  const {
    i18n: { language, changeLanguage },
  } = useTranslation()
  const onSelectionChange = (lang: Key) => {
    if (typeof lang === 'string') {
      setLocale(lang as 'pt-BR' | 'en')
      changeLanguage(lang)
    }
  }
  return (
    <Language.Select
      aria-label="language select"
      selectedKey={language}
      onSelectionChange={onSelectionChange}
    >
      <Language.Button>
        <SelectValue />
        <ChevronDown />
      </Language.Button>
      <Language.Popover>
        <ListBox>
          <Language.ListBoxItem id="pt-BR">PT</Language.ListBoxItem>
          <Language.ListBoxItem id="en">EN</Language.ListBoxItem>
        </ListBox>
      </Language.Popover>
    </Language.Select>
  )
}
