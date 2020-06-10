import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import ModalBase from 'weplay-components/ModalBase'

import SignUpHeader from 'weplay-platform/components/Modals/SignUpModal/SignUpHeader'
import ProgressBar from 'weplay-platform/components/Modals/components/ProgressBar/ProgressBar'

import EmailInputForm from '../components/EmailInputForm'
import HeaderSocials from '../components/HeaderSocials/HeaderSocials'
import VerificationCodeForm from '../components/VerificationCodeForm'
import SuccessMessage from '../components/SuccessMessage'
import FooterSocials from '../components/FooterSocials/FooterSocials'

import NicknamePasswordForm from './NicknamePasswordForm'
import container from './container'
import styles from './styles.scss'

const SignUpModal = ({
  isShown,
  step,
  handleClose,
  logAuthEvent,
  handleValidateRegistrationCode,
  authErrorMessage,
  resetAuthError,
  serverErrorMessage,
  handleSuccessMessageButtonClick,
  errors,
  touched,
  setFieldTouched,
  dirty,
  handleSubmit,
  resetForm,
  goToStep,
  logFormAnalytics,
}) => {
  const t = useTranslation()

  return (
    <ModalBase
      handleClose={handleClose}
      isShown={isShown}
      data-gtm="Joining the community (magic link)"
    >
      <div className={styles.body}>
        <>
          <SignUpHeader
            step={step}
          />
          <HeaderSocials
            text={t('mediaCore.modals.registration.withEmail')}
            logAuthEvent={logAuthEvent}
          />
          <ProgressBar step={step} />
          {step === 'signUpStep1' && (
          <EmailInputForm
            errors={errors}
            touched={touched}
            setFieldTouched={setFieldTouched}
            dirty={dirty}
            step={step}
            logAnalyticsWithAction={logAuthEvent}
            serverErrorMessage={serverErrorMessage}
            isCheckboxVisible
            resetForm={resetForm}
          >
            <FooterSocials
              text={t('mediaCore.modals.registration.alternativeRegister')}
              logAuthEvent={logAuthEvent}
            />
          </EmailInputForm>
          )}
          {step === 'signUpStep2' && (
          <VerificationCodeForm
            step={step}
            validateCode={handleValidateRegistrationCode}
            resendCode={handleSubmit}
            authErrorMessage={authErrorMessage}
            resetAuthError={resetAuthError}
            goToStep={() => goToStep('signUpStep1')}
          />
          )}
          {step === 'signUpStep3' && (
          <NicknamePasswordForm
            step={step}
            goToStep={() => goToStep('signUpStep4')}
            logFormAnalytics={logFormAnalytics}
          />
          )}
          {step === 'signUpStep4' && (
          <SuccessMessage
            handleClick={handleSuccessMessageButtonClick}
            text={t('mediaCore.modals.registration.regCreateSuccessText')}
            step={step}
          />
          )}
        </>
      </div>
    </ModalBase>
  )
}

SignUpModal.propTypes = {
  step: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  logAuthEvent: PropTypes.func.isRequired,
  handleValidateRegistrationCode: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  authErrorMessage: PropTypes.string,
  resetAuthError: PropTypes.func.isRequired,
  serverErrorMessage: PropTypes.string,
  handleSuccessMessageButtonClick: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  touched: PropTypes.shape({}).isRequired,
  dirty: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  goToStep: PropTypes.func.isRequired,
  logFormAnalytics: PropTypes.func.isRequired,
}
SignUpModal.defaultProps = {
  // optional props
  authErrorMessage: null,
  serverErrorMessage: null,
}

export default container(SignUpModal)
