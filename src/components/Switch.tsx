import type { PropsWithChildren } from 'react'
import type { ButtonProps } from 'react-aria-components'
import { ButtonSwitch } from './styled/ButtonSwitch'

export default function Switch({
  children,
  isSelected,
  onChange,
  id,
  ...props
}: PropsWithChildren<
  {
    isSelected: boolean
    onChange: (selected: boolean) => void
    id: string
  } & ButtonProps
>) {
  return (
    <ButtonSwitch id={id} onPress={() => onChange(!isSelected)} {...props}>
      {children}
    </ButtonSwitch>
  )
}
