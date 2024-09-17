import type { User } from '@services/UserService'
import UserCard from './UserCard'
import { GridContainer } from './styled/GridContainer'

export default function UsersCardGrid({ users }: { users: User[] }) {
  return (
    <GridContainer>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </GridContainer>
  )
}
