import { type PersistStorage, createJSONStorage } from 'zustand/middleware'

export function storage<T>() {
  return createJSONStorage(() => ({
    getItem: (name: string): string | null => {
      return localStorage.getItem(name) ?? null
    },
    setItem: (name: string, value: string): void => {
      localStorage.setItem(name, value)
    },
    removeItem: (name: string): void => {
      localStorage.removeItem(name)
    },
  })) as PersistStorage<T> | undefined
}
