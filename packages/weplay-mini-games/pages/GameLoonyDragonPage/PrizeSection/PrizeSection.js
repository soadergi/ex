import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './PrizeSection.scss'
import Prize from './Prize/Prize'

const PrizeSection = () => {
  const t = useTranslation()
  return (
    <>
      <div className="u-mt-3">
        <Prize />
      </div>
      <div className={styles.block}>
        <p className={styles.title}>
          {t('mediaCore.gameLoonyDragon.prize.title')}
        </p>
        <p className={styles.text}>
          {t('mediaCore.gameLoonyDragon.prize.description')}
        </p>
        <ul className={styles.list}>
          <li className={styles.item}>
            <span className={styles.place}>
              {t('mediaCore.gameLoonyDragon.prizeText.1stPlace')}
            </span>
            <span className={styles.prize}>
              {t('mediaCore.gameLoonyDragon.prize.1stPlace')}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.place}>
              {t('mediaCore.gameLoonyDragon.prizeText.2ndPlace')}
            </span>
            <span className={styles.prize}>
              {t('mediaCore.gameLoonyDragon.prize.2ndPlace')}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.place}>
              {t('mediaCore.gameLoonyDragon.prizeText.3ndPlace')}
            </span>
            <span className={styles.prize}>
              {t('mediaCore.gameLoonyDragon.prize.3ndPlace')}
            </span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default PrizeSection
