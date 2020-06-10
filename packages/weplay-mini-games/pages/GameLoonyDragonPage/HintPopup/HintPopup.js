import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'

import styles from './HintPopup.scss'

const HintPopup = () => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <p className={styles.text}>
        <Icon
          iconName="tap"
          className={styles.icon}
          size="small"
        />
        {t('mediaCore.gameLoonyDragon.hint.first')}
      </p>
      <p className={styles.text}>
        <Icon
          iconName="cup"
          className={styles.icon}
          size="small"
        />
        {t('mediaCore.gameLoonyDragon.hint.second')}
      </p>
    </div>
  )
}

export default HintPopup
