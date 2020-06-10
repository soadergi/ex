import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import insertScript from 'weplay-core/helpers/insertScript'

import { AT__SUPPORT_BLUE_ZENDESK } from 'weplay-competitive/analytics/amplitude'

const ZendeskSupportWidget = ({
  logAmplitude,
}) => {
  const globalScope = useSelector(globalScopeSelector)
  const { locale } = useLocale()

  const onLoaded = () => {
    globalScope.zE('webWidget', 'setLocale', locale)
    globalScope.zE('webWidget:on', 'open', () => {
      logAmplitude(AT__SUPPORT_BLUE_ZENDESK)
    })
  }

  useEffect(() => {
    insertScript({
      globalScope,
      src: 'https://static.zdassets.com/ekr/snippet.js?key=a2526b7d-2185-4e69-ac5f-b1937ca36479',
      id: 'ze-snippet',
      async: true,
      onLoaded,
    })

    return () => {
      globalScope.zE('webWidget', 'hide')
      delete window.zE
    }
  }, [])

  useEffect(() => {
    if (globalScope.zE) {
      globalScope.zE('webWidget', 'setLocale', locale)
    }
  }, [locale])

  return null
}

export default withAnalytics(ZendeskSupportWidget)
