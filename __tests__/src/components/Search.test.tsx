import { Search } from '@components/Search'
import { fireEvent, render, screen } from '@testing-library/react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}))

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

describe('Search Component', () => {
  const setSearchParams = jest.fn()

  beforeEach(() => {
    ;(useSearchParams as jest.Mock).mockReturnValue([{}, setSearchParams])
    ;(useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    })
    jest.clearAllMocks()
  })

  test('renders the label and search input with translation', () => {
    render(<Search searchTerm="John" />)
    expect(screen.getByText('homepage.searchUsers')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('homepage.enterName'),
    ).toBeInTheDocument()
  })

  test('calls setSearchParams when search input is changed', () => {
    render(<Search searchTerm="John" />)
    const input = screen.getByPlaceholderText('homepage.enterName')
    fireEvent.change(input, { target: { value: 'Jane' } })
    expect(setSearchParams).toHaveBeenCalledWith({ search: 'Jane' })
  })

  test('clears search params when input is empty', () => {
    render(<Search searchTerm="John" />)
    const input = screen.getByPlaceholderText('homepage.enterName')
    fireEvent.change(input, { target: { value: '' } })
    expect(setSearchParams).toHaveBeenCalledWith({})
  })
})
