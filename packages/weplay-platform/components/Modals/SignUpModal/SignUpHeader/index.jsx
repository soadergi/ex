import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Header from 'weplay-components/_modal-components/Header'

import AuthHeader from '../../components/AuthHeader/AuthHeader'

import container from './container'

const SignUpHeader = ({
  step,
  handleRedirectToLogin,
}) => {
  const t = useTranslation()
  return (
    <Header
      {...(step !== 'signUpStep1') && { title: t(`mediaCore.modals.registration.${step}.title`) }}
      {...(step !== 'signUpStep4') && { subtitle: t(`mediaCore.modals.registration.${step}.subTitle`) }}
    >
      {step === 'signUpStep1' && (
      <AuthHeader
        onClick={handleRedirectToLogin}
        isRegistrationModal
      />
      )}
    </Header>
  )
}

SignUpHeader.propTypes = {
  step: PropTypes.string.isRequired,
  handleRedirectToLogin: PropTypes.func.isRequired,
}

export default container(SignUpHeader)
