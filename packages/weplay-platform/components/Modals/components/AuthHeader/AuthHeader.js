import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './AuthHeader.scss'

const AuthHeader = ({
  isRegistrationModal,
  onClick,
  className,
}) => {
  const t = useTranslation()

  const loginText = t('mediaCore.modals.registration.signIn')
  const registerText = t('mediaCore.modals.registration.signUpStep1.title')

  return (
    <div className={classNames(styles.block, className)}>
      {isRegistrationModal ? (
        <span className={styles.text}>
          {registerText}
        </span>
      ) : (
        <button
          type="button"
          className={styles.button}
          onClick={onClick}
          data-analytics-values={JSON.stringify({
            eventCategory: 'entry',
            eventAction: 'text_click',
            eventLabel: 'login',
            eventContent: 'login form',
          })}
        >
          {registerText}
        </button>
      )}

      {isRegistrationModal ? (
        <button
          type="button"
          className={styles.button}
          onClick={onClick}
        >
          {loginText}
        </button>
      ) : (
        <div className={styles.text}>
          {loginText}
        </div>
      )}
    </div>
  )
}

AuthHeader.propTypes = {
  isRegistrationModal: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
}

AuthHeader.defaultProps = {
  isRegistrationModal: false,
  className: '',
}

export default AuthHeader
