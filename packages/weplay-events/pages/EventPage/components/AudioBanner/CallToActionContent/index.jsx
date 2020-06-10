import React, { useCallback } from 'react'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import useAction from 'weplay-core/helpers/useAction'
import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import styles from './style.scss'

function CallToActionContent() {
  const t = useTranslation()
  const { openLogin } = useAction({ openLogin: openLoginModal })

  const handleClick = useCallback(
    () => openLogin(),
    [],
  )

  return (
    <div className={styles.block}>
      <div className={styles.wrapContent}>
        <p className={styles.title}>{t('events.audioBanner.callToActionContent.title')}</p>

        <p className={styles.text}>{t('events.audioBanner.callToActionContent.text')}</p>

        <Button
          color={BUTTON_COLOR.CTA}
          className={styles.button}
          onClick={handleClick}
        >
          {t('events.audioBanner.callToActionContent.button')}
        </Button>
      </div>
    </div>
  )
}

export default React.memo(CallToActionContent)
