import type { User } from '../services/UserService'
import { User as StyledUser } from './styled/User'

export default function UserCard({ user }: { user: User }) {
  return (
    <StyledUser.Card aria-label={`User card for ${user.name}`}>
      <StyledUser.Name>{user.name}</StyledUser.Name>
      <StyledUser.Info>
        <strong>Email:</strong>
        <StyledUser.Link href={`mailto:${user.email}`}>
          {user.email}
        </StyledUser.Link>
      </StyledUser.Info>
      <StyledUser.Info>
        <strong>Phone:</strong>
        <StyledUser.Link href={`tel:${user.phone}`}>
          {user.phone}
        </StyledUser.Link>
      </StyledUser.Info>
    </StyledUser.Card>
  )
}
