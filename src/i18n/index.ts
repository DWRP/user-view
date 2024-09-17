import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import pt from './locales/pt-BR.json'

const resources = {
  en: {
    translation: en,
  },
  'pt-BR': {
    translation: pt,
  },
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'pt-BR',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
