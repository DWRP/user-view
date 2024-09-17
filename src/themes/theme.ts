import type { DefaultTheme } from 'styled-components'

export const lightTheme: DefaultTheme = {
  background: '#FFFFFF', // Fundo branco para máximo contraste
  text: '#1A1A1A', // Texto quase preto para suavizar o contraste
  textSecondary: '#333333', // Cinza escuro para melhor contraste com o fundo
  primary: '#005BBB', // Azul mais escuro para melhor visibilidade
  cardBackground: '#F5F5F5', // Leve contraste com o fundo principal
  inputBackground: '#FFFFFF',
  inputText: '#1A1A1A',
  inputBorder: '#A0A0A0', // Cinza médio para melhor visibilidade
  toggleBackground: '#E0E0E0',
  toggleText: '#1A1A1A',
  switchBackground: '#A0A0A0',
  switchHandleBackground: '#FFFFFF',
  tableHeaderBackground: '#E6E6E6',
  borderColor: '#A0A0A0',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
} as const

export const darkTheme: DefaultTheme = {
  background: '#121212', // Fundo preto para máximo contraste
  text: '#FFFFFF', // Texto branco para máximo contraste
  textSecondary: '#E0E0E0', // Cinza claro para contraste adequado
  primary: '#539BF5', // Azul mais claro para destacar em fundo escuro
  cardBackground: '#1E1E1E', // Leve diferença do fundo para destacar cartões
  inputBackground: '#1E1E1E',
  inputText: '#FFFFFF',
  inputBorder: '#3A3A3A', // Cinza escuro para contraste com o fundo dos inputs
  toggleBackground: '#3A3A3A',
  toggleText: '#FFFFFF',
  switchBackground: '#3A3A3A',
  switchHandleBackground: '#FFFFFF',
  tableHeaderBackground: '#2A2A2A',
  borderColor: '#3A3A3A',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
} as const
