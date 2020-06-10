import { useEffect, useMemo, useState } from 'react'
// TODO: remove this package
import i18n from 'i18n-react'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useRouteContext } from 'weplay-singleton/RouterProvider/useRouteContext'
import { defaultLanguage, getUserLanguage, updateLanguageByLocation } from 'weplay-core/helpers/languages'
import { getLanguageFromLocation } from 'weplay-core/routes/_helpers'

export const useMain = ({
  history,
  location,
}) => {
  const { isNext } = useRouteContext()

  const [isLanguageFetched, setIsLanguageFetched] = useState(isNext)
  const { setMessages, setLocale, locale } = useLocale()
  const language = useMemo(() => getLanguageFromLocation(location), [location])

  useEffect(() => {
    if (!isLanguageFetched && language !== i18n.currentLanguage) {
      const storageLanguage = getUserLanguage()
      if (location.pathname === '/' && storageLanguage !== defaultLanguage) {
        history.push(`${storageLanguage}${location.search}`)
      } else if (location.pathname === `/${defaultLanguage}`) {
        history.push(`/${location.search}`)
      }
      updateLanguageByLocation({
        location,
        setMessages,
        setLocale,
        locale,
      }).then(() => setIsLanguageFetched(true))
    }
  }, [isLanguageFetched, language, i18n.currentLanguage])

  useEffect(() => {
    history.listen(newLocation => updateLanguageByLocation({
      location: newLocation,
      setMessages,
      setLocale,
      locale,
    }))
  })

  return { isLoading: !isLanguageFetched }
}
