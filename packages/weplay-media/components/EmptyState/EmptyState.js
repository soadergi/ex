import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Image from 'weplay-components/Image'

import styles from './EmptyState.scss'

const image = 'https://static-prod.weplay.tv/2020-04-29/5064b6e2bc1b8291edf966d6c08e630a.307493-D0B688-6EDAF2.png'

const EmptyState = () => {
  const t = useTranslation()
  return (
    <div className={styles.block}>
      <Image
        src={image}
        className={styles.image}
      />
      <p className={styles.title}>{t('mediaCore.character.empty.title')}</p>
      <p className={styles.text}>{t('mediaCore.character.empty.text')}</p>
    </div>
  )
}

export default EmptyState
