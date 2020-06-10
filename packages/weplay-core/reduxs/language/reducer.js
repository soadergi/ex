import i18n from 'i18n-react'
import { createSelector } from 'reselect'

export const currentLanguageSelector = () => i18n.currentLanguage
export const i18nTextsSelector = () => i18n.texts

export const currentLanguagePrefixSelector = createSelector(
  [currentLanguageSelector],
  currentLanguage => (
    currentLanguage === 'en'
      ? ''
      : `/${currentLanguage}`
  ),
)
