import { TableBody } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import type { User } from '../services/UserService'
import { Table } from './styled/Table'

export default function UserTable({ users }: { users: User[] }) {
  const { t } = useTranslation()
  return (
    <Table.Root aria-label="user-table-container">
      <Table.Table aria-label="user-table" selectionMode="none">
        <Table.Header>
          <Table.Row>
            <Table.Column isRowHeader>{t('homepage.table.name')}</Table.Column>
            <Table.Column>{t('homepage.table.email')}</Table.Column>
            <Table.Column>{t('homepage.table.phone')}</Table.Column>
          </Table.Row>
        </Table.Header>
        <TableBody>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.phone}</Table.Cell>
            </Table.Row>
          ))}
        </TableBody>
      </Table.Table>
    </Table.Root>
  )
}
