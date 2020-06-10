import React from 'react'
import classNames from 'classnames'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'

import HrefLangLink from 'weplay-components/HrefLangLink'
import Image from 'weplay-components/Image'
import IsomorphicHead from 'weplay-components/IsomorphicHead'
import PageHelmet from 'weplay-components/PageHelmet'

import oracle from './oracle.mp4'
import sphere from './sphere.mp4'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import { useCrystalBallPage } from './container'
import styles from './styles.scss'
import sphereImg from './img/sphere.png'
import SubscribeModal from './SubscribeModal'

const CrystalBallPage = () => {
  const {
    isMobileWidth,
    currentPrediction,
    isSubscribeModalVisible,
    handleAnimation,
    handleSubscription,
    handleSubscribeModalClose,
    seoInfo,
    clickCount,
    isPredictionGenerating,
    ogImage,
    hasPrediction,
    globalScope,
  } = useCrystalBallPage()
  const { locale } = useLocale()

  const langPrefix = locale === 'en' ? '' : `/${locale}`
  return (
    <div className={styles.block}>
      <PageHelmet
        lokaliseProject="mediaCore"
        seoInfo={seoInfo}
        ogImage={ogImage}
      />
      <IsomorphicHead>
        <link
          rel="canonical"
          href={`${globalScope.origin}${langPrefix}${pathWithParamsByRoute(NAMES.CRYSTAL_BALL)}`}
        />
      </IsomorphicHead>
      <HrefLangLink pathname={pathWithParamsByRoute(NAMES.CRYSTAL_BALL)} />
      {isMobileWidth ? (
        <>
          <Image
            className={classNames(
              styles.image,
              styles.sphereImg,
              {
                [styles.animation]: isPredictionGenerating,
              },
            )}
            src={sphereImg}
            alt={sphereImg}
          />
        </>
      )
        : (
          <>
            <video
              className={classNames(
                styles.video,
                styles.sphere,
                {
                  [styles.animation]: isPredictionGenerating,
                },
              )}

              autoPlay
              muted
              loop
              key={sphere}
            >
              <source
                src={sphere}
                type="video/mp4"
              />
            </video>
            <video
              className={classNames(
                styles.video,
                styles.oracle,
                {
                  [styles.animation]: isPredictionGenerating,
                },
              )}

              autoPlay
              muted
              loop
              key={oracle}
            >
              <source
                src={oracle}
                type="video/mp4"
              />
            </video>
          </>
        )}
      <Header handleSubscription={handleSubscription} />
      <Body
        handleAnimation={handleAnimation}
        prediction={currentPrediction}
        clickCount={clickCount}
        isPredictionGenerating={isPredictionGenerating}
        hasPrediction={hasPrediction}
      />
      <Footer />
      {isSubscribeModalVisible && !isPredictionGenerating && (
        <SubscribeModal
          handleSubscription={handleSubscription}
          handleClose={handleSubscribeModalClose}
          handleAnimation={handleAnimation}
          isShown={isSubscribeModalVisible}
        />
      )}
    </div>
  )
}

export default withRouteInfo(CrystalBallPage)
