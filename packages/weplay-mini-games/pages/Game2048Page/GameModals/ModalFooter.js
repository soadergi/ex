import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import ShareGameBlock from 'weplay-mini-games/components/ShareGameBlock/ShareGameBlock'

import styles from './styles.scss'

const ModalFooter = () => {
  const t = useTranslation()

  return (
    <div className={styles.footer}>
      <ShareGameBlock
        caption={t('mediaCore.game2048.socialShareButton.title')}
        shareText={t('mediaCore.game2048.sharedText')}
      />
    </div>
  )
}

export default ModalFooter
