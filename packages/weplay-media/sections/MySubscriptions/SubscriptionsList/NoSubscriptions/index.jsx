import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Image from 'weplay-components/Image'

import noSubscriptionInfoImage from './img/no-subscrb.png'
import styles from './styles.scss'

const NoSubscriptions = () => {
  const t = useTranslation()
  return (
    <div className={styles.block}>
      <figure className={styles.image}>
        <Image
          className={styles.img}
          src={noSubscriptionInfoImage}
          alt={t('mediaCore.profile.subscriptions.haveNoSubscriptions')}
        />
      </figure>
      <p className={styles.text}>{t('mediaCore.profile.subscriptions.haveNoSubscriptions')}</p>
    </div>
  )
}

export default React.memo(NoSubscriptions)
