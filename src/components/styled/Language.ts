import { Button, ListBoxItem, Popover, Select } from 'react-aria-components'
import styled from 'styled-components'

const SelectStyled = styled(Select)`
  position: relative;
  display: inline-block;
  
  width: 72px;
  height: 48px;
`

const ButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  border-radius: 0.375rem;

  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border: 2px solid ${({ theme }) => theme.inputBorder};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }
`

const PopoverStyled = styled(Popover)<{ isVisible: boolean }>`
  position: absolute;
  z-index: 1;
  min-width: 52px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.375rem;
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-top: 0.5rem;

  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};

  &[data-hidden="true"] {
    display: none;
  }
`

const ListBoxItemStyled = styled(ListBoxItem)`
  padding: 0.5rem;
  cursor: pointer;

  &[aria-selected='true'] {
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
  }

  &:hover {
    background-color: ${({ theme }) => theme.primary}99;
    color: #fff;
  }
`

export const Language = {
  Select: SelectStyled,
  Button: ButtonStyled,
  Popover: PopoverStyled,
  ListBoxItem: ListBoxItemStyled,
}
