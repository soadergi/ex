import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './PrizeSection.scss'
import Prize from './Prize/Prize'

const PrizeSection = () => {
  const t = useTranslation()
  return (
    <>
      <div className={styles.wrapper}>
        <Prize />

        <div className={styles.block}>
          <p className={styles.title}>
            {t('mediaCore.game2048.prize.title')}
          </p>
          <p className={styles.text}>
            {t('mediaCore.game2048.prize.daily.description')}
          </p>
          <ul className={styles.list}>
            <li className={styles.item}>
              <span className={styles.place}>
                {t('mediaCore.game2048.prizeText.1stPlace')}
              </span>
              <span className={styles.prize}>
                {t('mediaCore.game2048.prize.daily.1stPlace')}
              </span>
            </li>
          </ul>
          <p className={styles.text}>
            {t('mediaCore.game2048.prize.description')}
          </p>
          <ul className={styles.list}>
            <li className={styles.item}>
              <span className={styles.place}>
                {t('mediaCore.game2048.prizeText.1stPlace')}
              </span>
              <span className={styles.prize}>
                {t('mediaCore.game2048.prize.1stPlace')}
              </span>
            </li>
            <li className={styles.item}>
              <span className={styles.place}>
                {t('mediaCore.game2048.prizeText.2ndPlace')}
              </span>
              <span className={styles.prize}>
                {t('mediaCore.game2048.prize.2ndPlace')}
              </span>
            </li>
            <li className={styles.item}>
              <span className={styles.place}>
                {t('mediaCore.game2048.prizeText.3ndPlace')}
              </span>
              <span className={styles.prize}>
                {t('mediaCore.game2048.prize.3ndPlace')}
              </span>
            </li>
          </ul>
          <p className={styles.notice}>*this means the amount of your Steam gift certificate.</p>
        </div>
      </div>
    </>
  )
}

export default PrizeSection
