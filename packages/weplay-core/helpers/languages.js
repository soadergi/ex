import i18n from 'i18n-react'
import * as R from 'ramda'

import { getEnvironment } from 'weplay-singleton/helpers/getEnvironment'

import { getLanguageFromLocation } from 'weplay-core/routes/_helpers'
import enGlobalNavigationTexts from 'weplay-core/globalNavigationTexts/en.json'
import ruGlobalNavigationTexts from 'weplay-core/globalNavigationTexts/ru.json'
import config from 'weplay-core/config'
import { configureAcceptLang, sameBaseAxios } from 'weplay-core/services/axios'
import { getLokaliseUrl } from 'weplay-core/helpers/getLokaliseUrl'

import getBrowserGlobal from './ssr/getBrowserGlobal'

export const defaultLanguage = config.languages[0]
export const allLangRegexp = R.pipe(
  R.prop('languages'),
  R.join('|'),
)(config)

const getBrowserLanguage = () => {
  // TODO: @Andrew, check it when SSR will be implemented
  const browserGlobal = getBrowserGlobal()
  const globalLanguage = browserGlobal.navigator.userLanguage || browserGlobal.navigator.language || defaultLanguage
  const langString = globalLanguage.slice(0, 2).toLowerCase()
  return R.propOr(defaultLanguage, langString, config.languagesMap)
}

i18n.allLanguagesTexts = {
}

export const getUserLanguage = () => localStorage.getItem('userLanguage') || getBrowserLanguage()
export const saveLanguageToStorage = language => localStorage.setItem('userLanguage', language)

const legacyKey = 'frontend'
export const getTranslations = (language) => {
  const isProd = getEnvironment(getBrowserGlobal().location.origin) === 'prod'
  const url = getLokaliseUrl({
    pathToFile: 'compiled',
    locale: language,
    isProd,
  })

  return sameBaseAxios.get(
    url,
    { withCredentials: true, baseURL: null },
  ).catch(() => {
    console.warn('Language fetch failed')
    return {}
  })
    .then(({ data: lokalizeTranslations }) => {
      const legacyTranslations = lokalizeTranslations[legacyKey]
      return R.pipe(
        R.mergeDeepRight(R.omit([legacyKey], lokalizeTranslations)),
        R.mergeDeepRight(legacyTranslations),
      )(language === 'en' ? enGlobalNavigationTexts : ruGlobalNavigationTexts)
    })
}
const setLanguage = ({
  language,
  setMessages,
  setLocale,
}) => new Promise((resolve, reject) => {
  // TODO: in future i18n-react should die
  i18n.currentLanguage = language
  setLocale(language)
  if (i18n.allLanguagesTexts[language]) {
    i18n.setTexts(i18n.allLanguagesTexts[language])
    setMessages(i18n.allLanguagesTexts[language])
    resolve()
  } else {
    getTranslations(language)
      .then((translations) => {
        i18n.allLanguagesTexts[language] = translations
        i18n.setTexts(translations)
        setMessages(translations)
      })
      .then(resolve, reject)
  }
})

export const updateLanguageByLocation = ({
  location,
  setMessages,
  setLocale,
  locale,
}) => {
  const language = getLanguageFromLocation(location)
  if (language === i18n.currentLanguage && language === locale) {
    return Promise.resolve()
  }
  configureAcceptLang(language)
  saveLanguageToStorage(language)
  return setLanguage({
    language,
    setMessages,
    setLocale,
  })
}
