import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'

import EmailPasswordForm from 'weplay-components/EmailPasswordForm'

import AuthHeader from 'weplay-platform/components/Modals/components/AuthHeader/AuthHeader'
import FooterSocials from 'weplay-platform/components/Modals/components/FooterSocials/FooterSocials'
import HeaderSocials from 'weplay-platform/components/Modals/components/HeaderSocials/HeaderSocials'

import container from './container'
import styles from './styles.scss'

const LoginModal = ({
  authErrorMessage,
  handleRedirectToForgotPassword,
  handleRedirectToSignUp,
  handleSubmit,
  logAuthEvent,
  step,
}) => {
  const t = useTranslation()
  return (
    <div className={styles.block}>
      <AuthHeader
        className={styles.header}
        onClick={handleRedirectToSignUp}
      />
      <HeaderSocials
        text={t('mediaCore.modals.login.withEmail')}
        logAuthEvent={logAuthEvent}
      />
      <div className={styles.content}>
        {authErrorMessage === 'Invalid user credentials.' && (
          <p
            className={styles.error}
            data-qa-id={dataQaIds.modals.loginModal.error}
          >
            {t('serverErrors.invalidUserCredentials')}
            <button
              type="button"
              className={styles.message}
              data-qa-id={dataQaIds.modals.loginModal.infoMessage}
              onClick={handleRedirectToForgotPassword}
            >
              {t('serverErrors.invalidUserCredentialsLink')}
            </button>
          </p>
        )}
        {authErrorMessage === 'Not found email' && (
          <p className={styles.error}>
            {t('serverErrors.invalidUserEmail')}
          </p>
        )}
        {authErrorMessage === 'User banned' && (
          <p className={styles.error}>
            {t('serverErrors.userBanned')}
          </p>
        )}
      </div>

      <EmailPasswordForm
        step={step}
        onSubmit={handleSubmit}
        submitButtonText={t('registration.signIn')}
      />
      <button
        type="button"
        className={styles.link}
        onClick={handleRedirectToForgotPassword}
      >
        {t('registration.forgotPass')}
      </button>
      <FooterSocials
        text={t('registration.alternativeSignIn')}
        logAuthEvent={logAuthEvent}
      />
    </div>
  )
}

LoginModal.propTypes = {
  authErrorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleRedirectToForgotPassword: PropTypes.func.isRequired,
  handleRedirectToSignUp: PropTypes.func.isRequired,
  step: PropTypes.string.isRequired,
  logAuthEvent: PropTypes.func.isRequired,
}

LoginModal.defaultProps = {
  authErrorMessage: null,
}

export default container(LoginModal)
