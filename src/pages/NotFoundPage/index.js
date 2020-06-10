import React from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import Image from 'weplay-components/Image'
import Button, { ICON_SIDE } from 'weplay-components/Button'

import image from './img/not-found.png'
import video from './not-found.mp4'
import container from './container'
import styles from './styles.scss'

const NotFoundPage = () => {
  const t = useTranslation()

  const isMobileWidth = useSelector(isMobileWidthSelector)
  return (
    <div
      className={styles.block}
      data-qa-id={dataQaIds.pages[NAMES.NOT_FOUND].container}
    >
      {isMobileWidth ? (
        <>
          <Image
            className={styles.image}
            src={image}
            alt={image}
          />
        </>
      )
        : (
          <video
            className={styles.video}
            autoPlay
            muted
            loop
          >
            <source
              src={video}
              type="video/mp4"
            />
          </video>

        )}
      <Button
        iconSide={ICON_SIDE.RIGHT}
        className={styles.button}
        icon="arrow-link"
        href="/"
      >
        {t('mediaCore.notFoundPage.button')}
      </Button>

    </div>
  )
}

export default container(NotFoundPage)
