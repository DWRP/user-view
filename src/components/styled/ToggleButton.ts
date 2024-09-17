import { Button } from 'react-aria-components'
import styled from 'styled-components'

export const ToggleButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  padding: 0.5rem;
  border-radius: 0.375rem;

  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border: 2px solid ${({ theme }) => theme.inputBorder};

  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;

  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.primary};
  }
`
