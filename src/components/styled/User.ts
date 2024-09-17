import { Link } from 'react-aria-components'
import styled from 'styled-components'

const Card = styled.article`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: background-color 0.2s, color 0.2s;
  box-sizing: border-box;
  width: 100%; /* Assegura que o card ocupe toda a largura disponível */
`

const UserName = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`

const UserInfo = styled.p`
  display: flex;
  flex-direction: column;

  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0.25rem;
  word-wrap: break-word; /* Evita que textos longos quebrem o layout */
`

const DefaultLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`

export const User = {
  Card,
  Name: UserName,
  Info: UserInfo,
  Link: DefaultLink,
}
