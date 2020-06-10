import React, {
  useEffect,
} from 'react'

import { isProd } from 'helpers'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { getLanguageFromLocation } from 'weplay-core/routes/_helpers'
import { configureAcceptLang } from 'weplay-core/services/axios'
import { getLokaliseUrl } from 'weplay-core/helpers/getLokaliseUrl'

const HistoryDetector = ({
  children,
  router,
}) => {
  const {
    setLocale,
    locale,
    setMessages,
  } = useLocale()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.events.on('routeChangeStart', (pathname) => {
        const newLocale = getLanguageFromLocation({ pathname })
        if (locale !== newLocale) {
          setLocale(newLocale)
          configureAcceptLang(newLocale)
        }
      })
    }
  }, [locale, router.events, setLocale])
  useEffect(() => {
    const url = getLokaliseUrl({
      pathToFile: 'weplay-b2b',
      locale,
      isProd,
    })
    fetch(
      url,
      { mode: 'cors' },
    )
      .then(response => response.json())
      .then(setMessages)
  }, [locale, setMessages])

  return <>{children}</>
}

export default React.memo(HistoryDetector)
