import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'
import ModalBase from 'weplay-components/ModalBase'
import Button from 'weplay-components/Button'

import container from './container'
import styles from './styles.scss'

const LastSocialNotificationModal = ({
  // required props
  toggleLastSocialNotificationModal,
  handleClick,
  // optional props
  isShown,
}) => {
  const t = useTranslation()
  return (
    <ModalBase
      handleClose={toggleLastSocialNotificationModal}
      isShown={isShown}
    >
      <div className={styles.block}>
        <p className={styles.title}>
          {t('mediaCore.profile.lastSocialNotificationModal.title')}
        </p>
        <div className={styles.section}>
          <Icon
            className={styles.icon}
            iconName="warning"
          />
          <span className={styles.subtitle}>
            {t('mediaCore.profile.lastSocialNotificationModal.subtitle')}
          </span>
        </div>
        <p className={styles.text}>
          {t('mediaCore.profile.lastSocialNotificationModal.text')}
        </p>
        <Button
          type="button"
          className={styles.button}
          onClick={handleClick}
        >
          {t('mediaCore.profile.lastSocialNotificationModal.button')}
        </Button>
      </div>
    </ModalBase>
  )
}

LastSocialNotificationModal.propTypes = {
  // required props
  toggleLastSocialNotificationModal: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  // optional props
  isShown: PropTypes.bool.isRequired,
}

export default container(LastSocialNotificationModal)
