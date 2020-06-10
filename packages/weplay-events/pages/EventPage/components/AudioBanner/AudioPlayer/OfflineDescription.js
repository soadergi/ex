import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './style.scss'

function OfflineDescription() {
  const t = useTranslation()

  return (
    <>
      <div className={styles.wrapContent}>
        <span className={styles.text}>{t('events.audioBanner.audioPlayer.text.isOffline')}</span>
      </div>

      <p className={styles.title}>{t('events.tug-of-war-mad-moon.calendar.finished.offlineDescription')}</p>
    </>
  )
}

export default OfflineDescription
