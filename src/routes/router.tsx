import { Homepage } from '@pages/home/Homepage'
import { useAppStore } from '@store/app'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

export const AppRouter = () => {
  const { lang, theme, setTheme } = useAppStore()

  const {
    i18n: { language, changeLanguage },
  } = useTranslation()

  useEffect(() => {
    let isMounted = true

    const updateLanguageAnTheme = async () => {
      if (isMounted) {
        if (lang && lang !== language) {
          await changeLanguage(lang)
        }

        if (
          theme &&
          theme !== document.documentElement.getAttribute('data-theme')
        ) {
          setTheme(theme)
        }
      }
    }

    updateLanguageAnTheme()

    return () => {
      isMounted = false
    }
  }, [lang, language, theme, setTheme, changeLanguage])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  )
}
