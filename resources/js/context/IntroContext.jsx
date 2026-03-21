import { createContext, useContext, useState } from 'react'

const IntroContext = createContext(null)
const STORAGE_KEY = 'axcerulean_intro_seen'

export function IntroProvider({ children }) {
  const [entered, setEntered] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  const enterPortfolio = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    } catch {}
    setEntered(true)
  }

  return (
    <IntroContext.Provider value={{ entered, enterPortfolio }}>
      {children}
    </IntroContext.Provider>
  )
}

export function useIntro() {
  return useContext(IntroContext)
}