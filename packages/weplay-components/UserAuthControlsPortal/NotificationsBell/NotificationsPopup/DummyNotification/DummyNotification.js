import React, { useCallback } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import useAction from 'weplay-core/helpers/useAction'
import { triggerSignUpModal } from 'weplay-core/reduxs/_legacy/modals/actions'

import Button, { BUTTON_COLOR } from 'weplay-components/Button'
import SocialNetworksLogin from 'weplay-components/SocialNetworksLogin/loadable'

import styles from './DummyNotification.scss'

const requestParams = { is_bell_source: true }

const DummyNotification = () => {
  const { openSingUpModal } = useAction({ openSingUpModal: triggerSignUpModal })
  const t = useTranslation()

  const handleClickButton = useCallback(() => {
    openSingUpModal({ isBellSource: true })
  }, [openSingUpModal])

  const logAuthEvent = useCallback(
    () => {
      console.warn('Mambyk implement')
    },
    [openSingUpModal],
  )
  return (
    <div className={styles.block}>
      <p className={styles.description}>{t('mediaCore.notification.popup.description')}</p>
      <SocialNetworksLogin
        requestParams={requestParams}
        logAuthEvent={logAuthEvent}
      />
      <Button
        className={styles.button}
        color={BUTTON_COLOR.CTA}
        icon="email-filled"
        onClick={handleClickButton}
      >
        {t('mediaCore.notification.popup.button')}
      </Button>
    </div>
  )
}

export default DummyNotification
