import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import notFoundImage from './img/404.svg'
import styles from './styles.scss'

const NotFoundPage = () => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <div className={styles.content}>
        <div className={styles.image}>
          <img
            src={notFoundImage}
            alt="404"
          />
        </div>
        <div className={styles.section}>
          <h2 className={styles.title}>404</h2>
          <p className={styles.subtitle}>{t('notFoundPage.somethingWentWrong')}</p>
          <p>{t('notFoundPage.weHaveNotYetCreatedSuchPage')}</p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
