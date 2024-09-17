import { Button } from 'react-aria-components'
import styled from 'styled-components'

export const ButtonSwitch = styled(Button)`
  display: flex;
  align-items: center;

  justify-content: center;

  padding: 0.8rem;

  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border: 2px solid ${({ theme }) => theme.inputBorder};

  border-radius: 0.5rem;
  transition: background-color 0.2s, color 0.2s;

  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.primary};
  }
`
