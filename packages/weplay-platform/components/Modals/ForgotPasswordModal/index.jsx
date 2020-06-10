import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import ModalBase from 'weplay-components/ModalBase'

import ProgressBar from '../components/ProgressBar/ProgressBar'
import VerificationCodeForm from '../components/VerificationCodeForm'
import SuccessMessage from '../components/SuccessMessage'
import EmailInputForm from '../components/EmailInputForm'

import PasswordsInputForm from './PasswordsInputForm'
import ForgotPassHeader from './ForgotPassHeader'
import container from './container'

const ForgotPasswordModal = ({
  forgotPassVisibility,
  step,
  handleClose,
  actionType,
  handleValidateForgotPasswordCode,
  handleSubmit,
  authErrorMessage,
  resetAuthError,
  serverErrorMessage,
  handleSuccessMessageButtonClick,
  errors,
  touched,
  setFieldTouched,
  dirty,
  resetForm,
  goToStep,
}) => {
  const t = useTranslation()
  return (
    <ModalBase
      handleClose={handleClose}
      isShown={forgotPassVisibility}
      data-gtm="Password recovery"
    >
      <>
        {step && (
          <div>
            <ForgotPassHeader
              actionType={actionType}
              step={step}
            />
            <ProgressBar step={step} />
              {step === 'forgotPassStep1' && (
              <EmailInputForm
                actionType={actionType}
                step={step}
                errors={errors}
                touched={touched}
                setFieldTouched={setFieldTouched}
                dirty={dirty}
                serverErrorMessage={serverErrorMessage}
                resetForm={resetForm}
              />
              )}
              {step === 'forgotPassStep2' && (
              <VerificationCodeForm
                step={step}
                validateCode={handleValidateForgotPasswordCode}
                resendCode={handleSubmit}
                authErrorMessage={authErrorMessage}
                resetAuthError={resetAuthError}
                goToStep={() => goToStep('forgotPassStep1')}
              />
              )}
              {step === 'forgotPassStep3' && (
              <PasswordsInputForm
                step={step}
                goToStep={() => goToStep('forgotPassStep4')}
                t={t}
              />
              )}
              {step === 'forgotPassStep4' && (
              <SuccessMessage
                step={step}
                handleClick={handleSuccessMessageButtonClick}
                text={t('mediaCore.registration.changedPassMessage')}
              />
              )}
          </div>
        )}
      </>
    </ModalBase>
  )
}

ForgotPasswordModal.propTypes = {
  step: PropTypes.string.isRequired,
  actionType: PropTypes.string.isRequired,
  // INFO: redux-base
  forgotPassVisibility: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleValidateForgotPasswordCode: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetAuthError: PropTypes.func.isRequired,
  authErrorMessage: PropTypes.string,
  serverErrorMessage: PropTypes.string,
  handleSuccessMessageButtonClick: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  touched: PropTypes.shape({}).isRequired,
  dirty: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  goToStep: PropTypes.func.isRequired,
}
ForgotPasswordModal.defaultProps = {
  authErrorMessage: null,
  serverErrorMessage: null,
}
export default container(ForgotPasswordModal)
