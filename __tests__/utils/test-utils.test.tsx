import { User } from '@components/styled/User'
import i18n from '@i18n'
import { I18nextProvider } from 'react-i18next'
import { render } from './test-utils'
import '@testing-library/jest-dom'

test('should render User component with additional providers', () => {
  const Providers = ({ children }: { children: React.ReactNode }) => (
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  )

  const { container } = render(
    <User.Card>
      <User.Name>John Doe</User.Name>
    </User.Card>,
    { providers: Providers },
  )

  expect(container.firstChild).toBeInTheDocument()
})
