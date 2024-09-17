import { useState } from 'react'
import { Label } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { LanguageSelect } from '@components/LanguageSelect'
import { Search } from '@components/Search'
import Switch from '@components/Switch'
import ThemeToggle from '@components/ThemeToggle'
import UserTable from '@components/UserTable'
import UsersCardGrid from '@components/UsersCardGrid'
import { Header } from '@components/styled/Header'
import { Home } from '@components/styled/Home'
import { useUsers } from '@hooks/useUsers'

export const Homepage = () => {
  const { t } = useTranslation()

  const { users, isLoading, error } = useUsers()
  const [isCardView, setIsCardView] = useState(true)

  const [searchParams] = useSearchParams()

  const searchTerm = searchParams.get('search') || ''

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const renderUserList = () => {
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading users: {error.message}</p>
    if (users.length === 0) return <p>No users found.</p>
    return isCardView ? (
      <UsersCardGrid users={filteredUsers} />
    ) : (
      <UserTable users={filteredUsers} />
    )
  }

  return (
    <Home.Container>
      <Header.Root>
        <Header.Title>{t('homepage.title')}</Header.Title>
        <Header.Options>
          <LanguageSelect />
          <ThemeToggle />
        </Header.Options>
      </Header.Root>

      <Home.Main>
        <Home.Controls>
          <Search searchTerm={searchTerm} />
          <Switch
            id="view-toggle"
            isSelected={isCardView}
            onChange={setIsCardView}
            aria-labelledby="view-toggle-label"
            aria-label="toggle table label"
          >
            <Label id="view-toggle-label" htmlFor="view-toggle">
              {isCardView ? t('homepage.cardView') : t('homepage.tableView')}
            </Label>
          </Switch>
        </Home.Controls>

        <Home.Content>{renderUserList()}</Home.Content>
      </Home.Main>

      <Home.Footer>
        <p>
          &copy; {new Date().getFullYear()} Douglas Pardim Dev. All rights
          reserved.
        </p>
      </Home.Footer>
    </Home.Container>
  )
}
