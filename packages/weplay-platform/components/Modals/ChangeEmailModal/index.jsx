import React from 'react'
import * as PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import EmailPasswordForm from 'weplay-components/EmailPasswordForm'
import ModalBase from 'weplay-components/ModalBase'
import ProgressBar from 'weplay-platform/components/Modals/components/ProgressBar/ProgressBar'

import EmailInputForm from '../components/EmailInputForm'
import VerificationCodeForm from '../components/VerificationCodeForm'
import SuccessMessage from '../components/SuccessMessage'

import styles from './styles.scss'
import ChangeEmailStep3 from './ChangeEmailStep3'
import ChangeEmailHeader from './ChangeEmailHeader'
import container from './container'

const ChangeEmailModal = ({
  step,
  changeEmailModalVisibility,
  handleClose,
  approveSaveSubscriptions,
  declineSaveSubscriptions,
  handleValidateChangeEmailCode,
  authErrorMessage,
  resetAuthError,
  serverErrorMessage,
  currentUser,
  handleEmailPasswordFormSubmit,
  handleSuccessMessageButtonClick,
  errors,
  touched,
  setFieldTouched,
  dirty,
  handleSubmit,
  resetForm,
  goToStep,

}) => {
  const t = useTranslation()
  return (
    <ModalBase
      handleClose={handleClose}
      isShown={changeEmailModalVisibility}
    >
      <div className={styles.block}>
        <>
          {step && (
          <ChangeEmailHeader
            step={step}
          />
          )}
          <ProgressBar
            step={step}
            stepsCount={5}
          />
          {step === 'changeEmailStep1' && (
          <EmailPasswordForm
            step={step}
            onSubmit={handleEmailPasswordFormSubmit}
            isEmailDisabled
            userEmail={currentUser.email}
            submitButtonText={t('mediaCore.modals.registration.sendEmail')}
          />
          )}
          {step === 'changeEmailStep2' && (
          <EmailInputForm
            errors={errors}
            touched={touched}
            setFieldTouched={setFieldTouched}
            dirty={dirty}
            step={step}
            serverErrorMessage={serverErrorMessage}
            resetForm={resetForm}
          />
          )}
          {step === 'changeEmailStep3' && (
          <ChangeEmailStep3
            approveSaveSubscriptions={approveSaveSubscriptions}
            declineSaveSubscriptions={declineSaveSubscriptions}
            goToStep={goToStep}
            step={step}
          />
          )}
          {step === 'changeEmailStep4' && (
          <VerificationCodeForm
            resendCode={handleSubmit}
            validateCode={handleValidateChangeEmailCode}
            authErrorMessage={authErrorMessage}
            resetAuthError={resetAuthError}
            step={step}
            goToStep={() => goToStep('changeEmailStep3')}
          />
          )}
          {step === 'changeEmailStep5' && (
          <SuccessMessage
            step={step}
            handleClick={handleSuccessMessageButtonClick}
            text={t('mediaCore.modals.changeEmailModal.changeEmailStep5.successMessage')}
          />
          )}
        </>
      </div>
    </ModalBase>
  )
}
ChangeEmailModal.propTypes = {
  step: PropTypes.string.isRequired,
  changeEmailModalVisibility: PropTypes.bool.isRequired,
  declineSaveSubscriptions: PropTypes.func.isRequired,
  approveSaveSubscriptions: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleValidateChangeEmailCode: PropTypes.func.isRequired,
  resetAuthError: PropTypes.func.isRequired,
  authErrorMessage: PropTypes.string,
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  handleEmailPasswordFormSubmit: PropTypes.func.isRequired,
  // TODO authErrorMessage is using only in VerificationCodeForm and will be removed after form refactor
  serverErrorMessage: PropTypes.string,
  handleSuccessMessageButtonClick: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  touched: PropTypes.shape({}).isRequired,
  dirty: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  goToStep: PropTypes.func.isRequired,
}
ChangeEmailModal.defaultProps = {
  authErrorMessage: null,
  currentUser: {},
  serverErrorMessage: null,
}
export default container(ChangeEmailModal)
