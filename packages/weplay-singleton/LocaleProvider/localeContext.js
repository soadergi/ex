import { createContext, useContext } from 'react'

export const LocaleContext = createContext({
  get locale() {
    console.warn('not suposed to be called')
    return 'en'
  },
  setLocale: () => console.warn('not suposed to be called'),
  setMessages: () => console.warn('not suposed to be called'),
})
export const useLocale = () => useContext(LocaleContext)
