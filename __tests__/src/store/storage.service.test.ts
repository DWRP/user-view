import { storage } from '@store/storage.service'
import type { StorageValue } from 'zustand/middleware'

describe('Custom storage service with serialized state', () => {
  beforeEach(() => {
    // Limpar o localStorage antes de cada teste
    localStorage.clear()
    jest.clearAllMocks()
  })

  test('deve salvar o estado no localStorage corretamente', () => {
    const state = {
      state: {
        theme: 'light',
        lang: 'en',
      },
    }

    // Salvar o estado no storage sem usar JSON.stringify adicionalmente
    storage()?.setItem(
      'app',
      JSON.stringify(state) as unknown as StorageValue<unknown>,
    )

    // Verificar se o estado foi salvo corretamente no localStorage
    const appState = JSON.parse(localStorage.getItem('app') || '{}')
    const result = JSON.stringify(state)

    expect(appState).toBe(result)
  })

  test('deve recuperar o estado do localStorage corretamente', () => {
    const state = {
      state: {
        theme: 'light',
        lang: 'en',
      },
    }

    // Simular o estado salvo no localStorage
    localStorage.setItem('app', JSON.stringify(state))

    // Recuperar o estado do storage
    const result = JSON.stringify(storage()?.getItem('app'))

    const stateStringify = JSON.stringify(state)

    expect(result).toBe(stateStringify)

    // Verificar se o estado desserializado está correto
    const parsedResult = JSON.parse((result as unknown as string) || '')
    expect(parsedResult).toEqual(state)
  })

  test('deve retornar null se o estado não existir no localStorage', () => {
    // Tentar recuperar um estado inexistente do storage
    const result = storage()?.getItem('nonExistentKey')

    // Verificar se retorna null
    expect(result).toBeNull()
  })

  test('deve remover o estado do localStorage corretamente', () => {
    const state = {
      state: {
        theme: 'light',
        lang: 'en',
      },
    }

    // Simular o estado salvo no localStorage
    localStorage.setItem('app', JSON.stringify(state))

    // Remover o estado do storage
    storage()?.removeItem('app')

    // Verificar se o estado foi removido corretamente
    expect(localStorage.getItem('app')).toBeNull()
  })
})
