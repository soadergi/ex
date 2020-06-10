import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Image from 'weplay-components/Image'

import styles from './PrizeSection.scss'

const PRIZE_IMAGE = 'https://static-prod.weplay.tv/2020-06-02/59367b874bacbca0e9ebc4b37cb6863e.384558-7FC5AC-B9879A.png'

const PrizeSection = () => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <div className={styles.content}>
        <figure className={styles.imageWrap}>
          <Image
            src={PRIZE_IMAGE}
            alt="prize"
            className={styles.image}
          />
        </figure>

        {/* TODO: @Semen, correct all lokalise keys and content at all */}
        <p className={styles.title}>
          {t('mediaCore.gameMatchUp.prize.title')}
        </p>
        <p className={styles.text}>
          {t('mediaCore.gameMatchUp.prize.description')}
        </p>
        <ul className={styles.list}>
          <li className={styles.item}>
            <span className={styles.place}>
              {t('mediaCore.gameMatchUp.prizeText.1stPlace')}
            </span>
            <span className={styles.prize}>
              {t('mediaCore.gameMatchUp.prize.1stPlace')}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.place}>
              {t('mediaCore.gameMatchUp.prizeText.2ndPlace')}
            </span>
            <span className={styles.prize}>
              {t('mediaCore.gameMatchUp.prize.2ndPlace')}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.place}>
              {t('mediaCore.gameMatchUp.prizeText.3ndPlace')}
            </span>
            <span className={styles.prize}>
              {t('mediaCore.gameMatchUp.prize.3ndPlace')}
            </span>
          </li>
        </ul>
        <p className={styles.text}>
          {t('mediaCore.gameMatchUp.prize.daily.description')}
        </p>
        <ul className={styles.list}>
          <li className={styles.item}>
            <span className={styles.place}>
              {t('mediaCore.gameMatchUp.prizeText.1stPlace')}
            </span>
            <span className={styles.prize}>
              {t('mediaCore.gameMatchUp.prize.daily.1stPlace')}
            </span>
          </li>
        </ul>
        <p className={styles.mute}>{t('mediaCore.gameMatchUp.prize.infoText')}</p>
      </div>
    </div>
  )
}

export default React.memo(PrizeSection)
