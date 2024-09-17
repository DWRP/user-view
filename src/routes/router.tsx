import { Homepage } from '@pages/home/Homepage'
import { useAppStore } from '@store/app'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

export const AppRouter = () => {
  const { lang } = useAppStore()

  const {
    i18n: { language, changeLanguage },
  } = useTranslation()

  useEffect(() => {
    let isMounted = true

    const updateLanguage = async () => {
      if (isMounted) {
        if (lang && lang !== language) {
          await changeLanguage(lang)
        }
      }
    }

    updateLanguage()

    return () => {
      isMounted = false
    }
  }, [lang, language, changeLanguage])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  )
}
