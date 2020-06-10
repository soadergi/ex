import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './HintPopup.scss'

const HintPopup = () => {
  const t = useTranslation()

  return (
    <p className={styles.block}>
      {/* TODO: @Semen, correct this content */}
      {t('mediaCore.gameMatchUp.hintText')}
    </p>
  )
}

export default HintPopup
