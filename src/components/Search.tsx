import { Label, TextField } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { SearchInput } from './styled/SearchInput'

export const Search = ({ searchTerm }: { searchTerm: string }) => {
  const { t } = useTranslation()
  const [_, setSearchParams] = useSearchParams()

  const handleSearchChange = (value: string) => {
    if (!value) {
      setSearchParams({})
      return
    }
    setSearchParams({ search: value })
  }
  return (
    <TextField value={searchTerm} onChange={handleSearchChange}>
      <Label>{t('homepage.searchUsers')}</Label>
      <SearchInput placeholder={t('homepage.enterName')} />
    </TextField>
  )
}
