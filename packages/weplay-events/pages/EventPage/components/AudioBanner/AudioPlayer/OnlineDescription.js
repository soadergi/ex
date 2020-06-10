import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './style.scss'

function OnlineDescription({ streamTitle }) {
  const t = useTranslation()

  return (
    <>
      <div className={styles.wrapContent}>
        <span className={styles.label}>{t('events.liveNotification')}</span>

        <span className={styles.text}>{t('events.audioBanner.audioPlayer.text.isLive')}</span>
      </div>

      <p className={styles.title}>{streamTitle}</p>
    </>
  )
}

OnlineDescription.propTypes = {
  streamTitle: PropTypes.string.isRequired,
}

export default OnlineDescription
