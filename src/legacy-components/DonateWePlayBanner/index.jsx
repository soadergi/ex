import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Image from 'weplay-components/Image'
import Link from 'weplay-components/Link'

import styles from './styles.scss'
import logo from './img/weplay-donate-logo.svg'

const DonateWePlayBanner = () => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <Image
        className={styles.logo}
        src={logo}
        alt="logo"
      />

      <div className={styles.info}>
        <p className={styles.title}>
          {t('events.donateWePlayBanner.title')}
        </p>
        <p className={styles.title}>{t('events.donateWePlayBanner.subTitle')}</p>
      </div>

      <Link
        to="/donate-we-save"
        className={styles.link}
        rel="nofollow noreferrer noopener"
        data-event-action="buy tickets - header banner"
      >
        {t('events.donateWePlayBanner.linkText')}
      </Link>
    </div>
  )
}

export default DonateWePlayBanner
