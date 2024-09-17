import { Input } from 'react-aria-components'
import styled from 'styled-components'

export const SearchInput = styled(Input)`
  width: 100%;
  max-width: 256px;
  padding: 0.8rem;
  margin-top: 8px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 0.375rem;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary};
  }
`
