import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'

import { getIdFromUrl } from 'weplay-core/helpers/getIdFromUrl'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { NAMES, goTo } from 'weplay-core/routes'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import webAnalytics from 'weplay-core/services/webAnalytics'

import { predictions } from './config'

const CRYSTAL_BALL_OG_IMAGES = {
  en: 'https://static-prod.weplay.tv/2019-12-23/'
    + 'c718b2e86f4bdbc9a058b6dda8f57fc3.4143B0-D7BBD5-93AAD9.jpeg',
  ru: 'https://static-prod.weplay.tv/2019-12-23/'
    + '11dbe8116b628453c1049577cf8b7bde.4143B0-D6BAD6-93AAD9.jpeg',
}
const PREDICTION_ANIMATION_TIMEOUT = 3000
const CHANGE_PREDICTION_TIMEOUT = 2000
const CLICK_COUNT_TO_SHOW_SUBSCRIPTION = 5

export const useCrystalBallPage = () => {
  const { locale } = useLocale()
  const history = useHistory()
  const t = useTranslation()

  const [currentPrediction, setCurrentPrediction] = useState({})
  const [isPredictionGenerating, setIsPredictionGenerating] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [isSubscribeModalVisible, setIsSubscribeModalVisible] = useState(false)
  const hasPrediction = Boolean(Object.keys(currentPrediction).length)

  const isMobileWidth = useSelector(isMobileWidthSelector)
  const globalScope = useSelector(globalScopeSelector)

  const currentPredictionId = useMemo(() => getIdFromUrl(history.location.pathname), [history.location.pathname])
  const ogImage = useMemo(() => (hasPrediction
    ? currentPrediction.ogImage : CRYSTAL_BALL_OG_IMAGES[locale]), [currentPrediction, locale])
  const getSeoInfo = useCallback(() => {
    if (!currentPredictionId) {
      return {
        description: `${t('mediaCore.crystalBall.seo.default.description')}`,
        title: `${t('mediaCore.crystalBall.seo.default.title')}`,
      }
    }
    return {
      description: `${currentPrediction?.text} ${t('mediaCore.crystalBall.seo.prediction.description')}`,
      title: `${t('mediaCore.crystalBall.seo.prediction.title')}`,
    }
  }, [currentPrediction, currentPredictionId, locale, t])

  const getRandomKey = useCallback((keys) => {
    const randomId = keys[Math.floor(Math.random() * keys.length)]
    if (currentPredictionId === randomId) {
      return getRandomKey(keys)
    }
    return randomId
  }, [currentPredictionId])

  const handleChangePrediction = useCallback(() => {
    const keys = Object.keys(predictions)
    const predictionKey = getRandomKey(keys)
    goTo({
      name: NAMES.CRYSTAL_BALL,
      history,
      params: {
        section: `prediction-${predictionKey}`,
      },
    })
  }, [getRandomKey, history, locale])

  const handleAnimation = () => {
    if (!isPredictionGenerating) {
      setIsPredictionGenerating(true)
      setClickCount(clickCount + 1)
    }
  }

  const handleSubscription = () => {
    globalScope.localStorage.setItem('subscribedOnCrystalBall', true)
  }

  const handleSubscribeModalClose = () => {
    setIsSubscribeModalVisible(false)
  }

  useEffect(() => {
    // TODO: @Andrew, need to create usePageView hook if we want to use Pages without recompose!
    // TODO: And we have to create useRouteInfo hook also
    webAnalytics.sendPageView({
      pageType: `${NAMES.CRYSTAL_BALL} Page`,
    })
  }, [])

  useEffect(() => {
    if (history.location.pathname.includes('/prediction-')) {
      setCurrentPrediction(predictions[currentPredictionId][locale])
    }
  }, [currentPredictionId, history.location.pathname, locale])

  useEffect(() => {
    const isSubscribed = globalScope.localStorage.getItem('subscribedOnCrystalBall')
    if (clickCount !== 0 && clickCount % CLICK_COUNT_TO_SHOW_SUBSCRIPTION === 0 && !isSubscribed) {
      setIsSubscribeModalVisible(true)
    }
  }, [clickCount, currentPredictionId, globalScope.localStorage])

  useEffect(() => {
    let timeout
    if (isPredictionGenerating) {
      timeout = setTimeout(() => {
        handleChangePrediction()
      }, CHANGE_PREDICTION_TIMEOUT)
    }
    return () => clearTimeout(timeout)
  }, [handleChangePrediction, isPredictionGenerating])

  useEffect(() => {
    let timeout
    if (isPredictionGenerating) {
      timeout = setTimeout(() => {
        setIsPredictionGenerating(false)
      }, PREDICTION_ANIMATION_TIMEOUT)
    }
    return () => clearTimeout(timeout)
  }, [isPredictionGenerating])

  return {
    handleAnimation,
    isMobileWidth,
    currentPrediction,
    isSubscribeModalVisible,
    handleSubscription,
    handleSubscribeModalClose,
    seoInfo: getSeoInfo(),
    clickCount,
    isPredictionGenerating,
    ogImage,
    hasPrediction,
    globalScope,
  }
}
