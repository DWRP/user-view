import App from '@pages/app/App'
import ReactDOM from 'react-dom/client'

// Mock do ReactDOM.createRoot
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}))

describe('Root rendering', () => {
  test('deve renderizar o componente App', () => {
    // Configurar o mock do document.getElementById para retornar um elemento mock
    const mockRoot = document.createElement('div')
    mockRoot.setAttribute('id', 'root')
    document.body.appendChild(mockRoot)

    // Importar o arquivo principal após configurar os mocks
    require('@') // O arquivo que contém a inicialização do React (se for index.tsx ou index.js)

    // Verificar se createRoot foi chamado com o elemento correto
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(mockRoot)

    // Verificar se o método render foi chamado com o componente App
    const mockRender = (ReactDOM.createRoot as jest.Mock).mock.results[0].value
      .render
    expect(mockRender).toHaveBeenCalledWith(<App />)
  })
})
