import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Image from 'weplay-components/Image'

import styles from './LeaderBoard.scss'
import logoUrl from './img/leaderboard-logo.svg'

const LeaderBoardEmptyState = () => {
  const t = useTranslation()

  return (
    <>
      <Image
        className={styles.image}
        sizes="80"
        src={logoUrl}
        alt=""
      />

      <p className={styles.title}>{t('events.predictionsMainBlock.leaderboard.emptyState.title')}</p>
    </>
  )
}

export default React.memo(LeaderBoardEmptyState)
