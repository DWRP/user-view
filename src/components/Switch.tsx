import type { PropsWithChildren } from 'react'
import { ButtonSwitch } from './styled/ButtonSwitch'

export default function Switch({
  children,
  isSelected,
  onChange,
  id,
}: PropsWithChildren<{
  isSelected: boolean
  onChange: (selected: boolean) => void
  id: string
}>) {
  return (
    <ButtonSwitch
      id={id}
      onPress={() => onChange(!isSelected)}
      aria-label="toggle table view"
    >
      {children}
    </ButtonSwitch>
  )
}
