import { AppRouter } from '@routes/router'
import { AppProviders } from './AppProviders'
import '@themes/globals.css'

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  )
}

export default App
