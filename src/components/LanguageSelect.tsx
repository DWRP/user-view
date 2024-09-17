import { Language } from '@components/styled/Language'
import { useAppStore } from '@store/app'
import { ChevronDown } from 'lucide-react'
import { type Key, ListBox, SelectValue } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export const LanguageSelect = () => {
  const { setLocale } = useAppStore()
  const {
    i18n: { language, changeLanguage },
  } = useTranslation()

  const [isVisible, setIsVisible] = useState(false)

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
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <Language.Button>
        <SelectValue />
        <ChevronDown />
      </Language.Button>

      <Language.Popover aria-hidden={!isVisible} isVisible={isVisible}>
        <ListBox>
          <Language.ListBoxItem id="pt-BR" aria-hidden={!isVisible}>
            PT
          </Language.ListBoxItem>
          <Language.ListBoxItem id="en" aria-hidden={!isVisible}>
            EN
          </Language.ListBoxItem>
        </ListBox>
      </Language.Popover>
    </Language.Select>
  )
}
