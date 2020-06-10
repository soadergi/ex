import React from 'react'
import * as PropTypes from 'prop-types'

import ModalBase from 'weplay-components/ModalBase'

import container from './container'
import LoginModalContent from './LoginModalContent'

const LoginModal = ({
  isShown,
  handleClose,
  triggerForgotPass,
  triggerSignUp,
  triggerLogin,
}) => (
  <ModalBase
    handleClose={handleClose}
    isShown={isShown}
  >
    <LoginModalContent
      handleClose={handleClose}
      triggerForgotPass={triggerForgotPass}
      triggerSignUp={triggerSignUp}
      triggerLogin={triggerLogin}
    />
  </ModalBase>
)

LoginModal.propTypes = {
  isShown: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  triggerForgotPass: PropTypes.func.isRequired,
  triggerSignUp: PropTypes.func.isRequired,
  triggerLogin: PropTypes.func.isRequired,
}

LoginModal.defaultProps = {
}

export default container(LoginModal)
