import type { DefaultTheme } from 'styled-components'

export const lightTheme: DefaultTheme = {
  background: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#333333',
  primary: '#005BBB',
  cardBackground: '#F5F5F5',
  inputBackground: '#FFFFFF',
  inputText: '#1A1A1A',
  inputBorder: '#A0A0A0',
  toggleBackground: '#E0E0E0',
  toggleText: '#1A1A1A',
  switchBackground: '#A0A0A0',
  switchHandleBackground: '#FFFFFF',
  tableHeaderBackground: '#E6E6E6',
  borderColor: '#A0A0A0',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
} as const

export const darkTheme: DefaultTheme = {
  background: '#121212',
  text: '#FFFFFF',
  textSecondary: '#E0E0E0',
  primary: '#539BF5',
  cardBackground: '#1E1E1E',
  inputBackground: '#1E1E1E',
  inputText: '#FFFFFF',
  inputBorder: '#3A3A3A',
  toggleBackground: '#3A3A3A',
  toggleText: '#FFFFFF',
  switchBackground: '#3A3A3A',
  switchHandleBackground: '#FFFFFF',
  tableHeaderBackground: '#2A2A2A',
  borderColor: '#3A3A3A',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
} as const
