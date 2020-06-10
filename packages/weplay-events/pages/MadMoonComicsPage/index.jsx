import React, { useState, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'
import Image from 'weplay-components/Image'
import PageHelmet from 'weplay-components/PageHelmet'

import DropDown from 'weplay-events/components/DropDown'

import DownloadComicsButton from './DownloadComicsButton'
import styles from './styles.scss'

/* eslint-disable max-len */
const backgroundUrl = 'https://static-prod.weplay.tv/2020-02-18/de7381585d5923cda4e872e1764c3926.040433-040A3C-040C44.jpeg'
const logoUrl = 'https://static-prod.weplay.tv/2020-02-18/efc3fca00ee7ad14b7062c387e3329a8.375389-E2F2FB-7FB5DD.png'
const ogImageUrl = 'https://static-prod.weplay.tv/2020-02-18/e81abc8575888072571ceb1a777fd956.060839-DAE7F2-6395C2.png'
const comicsPreviewUrls = {
  ru: [
    'https://static-prod.weplay.tv/2020-02-18/6e45f1b48a203953f09de5ec56c743e7.21232B-C6878C-27A078.jpeg',
    'https://static-prod.weplay.tv/2020-02-18/44c9b66ffdf911d4315b4b2aad7ee47c.311D26-D08887-5C948F.jpeg',
    'https://static-prod.weplay.tv/2020-02-18/8ec23d3d4721580c9dff062952d0c2de.0F1D31-22A3C4-DDDFE0.jpeg',
    'https://static-prod.weplay.tv/2020-02-18/b122cd097be7d0512063579074fb291b.141F27-CBCFCB-2BA0B8.jpeg',
    'https://static-prod.weplay.tv/2020-02-18/e8c723b84ad897d0bc89936b147bd848.19322C-C5D6C9-279F59.jpeg',
  ],
  en: [
    'https://static-prod.weplay.tv/2020-02-18/09ec63a1c3174efe7c7d9600fa758506.21232B-C58287-279F78.jpeg',
    'https://static-prod.weplay.tv/2020-02-18/56afc6ee34ad34f9730ce8b33cbabdee.311D26-D08C8A-5C948F.jpeg',
    'https://static-prod.weplay.tv/2020-02-18/cd1b4ac65579eaa4567542b538ce057e.0F1D31-22A3C4-DDDFE0.jpeg',
    'https://static-prod.weplay.tv/2020-02-18/d47953db7467ad3e25a793a769b85cd0.141F27-CACFCB-2BA0B8.jpeg',
    'https://static-prod.weplay.tv/2020-02-18/8a1dc43a89498ed2f5f1b3084f2342c6.19322C-C9D9CC-279F59.jpeg',
  ],
}
/* eslint-enable max-len */

const MadMoonComicsPage = () => {
  const isLoggedIn = useSelector(isLoggedInSelector)
  const t = useTranslation()
  const { locale } = useLocale()
  const [comicPreviewsLoaded, setComicPreviewsLoaded] = useState(0)

  const incrementComicPreviewsLoaded = useCallback(() => {
    setComicPreviewsLoaded(loaded => loaded + 1)
  }, [setComicPreviewsLoaded])

  useEffect(() => {
    setComicPreviewsLoaded(0)
  }, [locale])

  return (
    <div
      className={styles.block}
      data-qa-id={dataQaIds.pages[NAMES.MAD_MOON_COMICS].container}
    >
      <PageHelmet
        ogImage={ogImageUrl}
        subPageName="page"
      />
      <ContentContainer>
        <BackgroundFullWidth
          src={backgroundUrl}
          alt="page-background"
        />

        <div className={styles.content}>
          <Image
            src={logoUrl}
            alt="logo-mad-moon"
            className={styles.logo}
          />

          <p className={styles.title}>{t('events.MadMoonComicsPage.title')}</p>

          <p className={styles.description}>{t('events.MadMoonComicsPage.description')}</p>

          <div className={styles.wrapDropDown}>
            <DropDown label={t('events.MadMoonComicsPage.label')}>
              <p className={styles.text}>{t('events.MadMoonComicsPage.rule')}</p>
            </DropDown>
          </div>

          <DownloadComicsButton />

          {!isLoggedIn && (
            <p className={classNames(
              styles.hint,
              { [styles.isLoggedIn]: isLoggedIn },
            )}
            >
              {t('events.MadMoonComicsPage.hintNotSignIn')}
            </p>
          )}
        </div>

        <div
          className={classNames([
            styles.wrap,
            comicPreviewsLoaded === comicsPreviewUrls.en.length && styles.readyForAnimation,
          ])}
        >
          {comicsPreviewUrls[locale].map(url => (
            <Image
              key={url}
              src={url}
              alt="comics-picture"
              className={styles.image}
              onLoad={incrementComicPreviewsLoaded}
            />
          ))}
        </div>
      </ContentContainer>
    </div>
  )
}

export default withPageViewAnalytics()(MadMoonComicsPage)
