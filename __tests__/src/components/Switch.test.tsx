import Switch from '@components/Switch'
import { useState } from 'react'
import { fireEvent, render, screen } from '../../utils/test-utils'

describe('Switch Component', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders correctly with the content passed as children', () => {
    render(
      <Switch isSelected={false} onChange={mockOnChange} id="switch-id">
        Toggle View
      </Switch>,
    )
    expect(screen.getByText('Toggle View')).toBeInTheDocument()
  })

  test('calls onChange with the correct value when clicked', () => {
    const TestComponent = () => {
      const [isSelected, setIsSelected] = useState(false)

      return (
        <Switch
          isSelected={isSelected}
          onChange={(value) => {
            setIsSelected(value)
            mockOnChange(value)
          }}
          id="switch-id"
        >
          Toggle View
        </Switch>
      )
    }

    render(<TestComponent />)

    const button = screen.getByText('Toggle View')

    fireEvent.click(button)
    expect(mockOnChange).toHaveBeenCalledWith(true)

    fireEvent.click(button)
    expect(mockOnChange).toHaveBeenCalledWith(false)
  })

  test('has the correct aria-label attribute', () => {
    render(
      <Switch isSelected={false} onChange={mockOnChange} id="switch-id">
        Toggle View
      </Switch>,
    )
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'toggle table view',
    )
  })
})
