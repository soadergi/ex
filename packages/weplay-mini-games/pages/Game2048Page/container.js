import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import webAnalytics from 'weplay-core/services/webAnalytics'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { NAMES } from 'weplay-core/routes'

// TODO: think about encapsulation

import { OG_IMAGES } from './config'

export const useGame2048Page = () => {
  const isMobileWidth = useSelector(isMobileWidthSelector)

  const [currentScore, setCurrentScore] = useState(0)

  const { locale } = useLocale()

  const ogImage = useMemo(() => OG_IMAGES[locale], [locale])

  useEffect(() => {
    // TODO: @Andrew, need to create usePageView hook if we want to use Pages without recompose!
    // TODO: And we have to create useRouteInfo hook also
    webAnalytics.sendPageView({
      pageType: `${NAMES.GAME_2048}Page`,
    })
  }, [])

  return {
    isMobileWidth,
    currentScore,
    setCurrentScore,
    ogImage,
  }
}
