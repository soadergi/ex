import {
  compose,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  triggerForgotPassModal,
  triggerLoginModal,
  triggerSignUpModal,
} from 'weplay-core/reduxs/_legacy/modals/actions'
import {
  isLoginModalVisibileSelector,
} from 'weplay-core/reduxs/_legacy/modals/reducer'
import withAuthService from 'weplay-core/HOCs/withAuthService'

const container = compose(
  connect(createStructuredSelector({
    isShown: isLoginModalVisibileSelector,
  }), {
    triggerLogin: triggerLoginModal,
    triggerForgotPass: triggerForgotPassModal,
    triggerSignUp: triggerSignUpModal,
  }),
  withAuthService,
  withHandlers({
    handleClose: props => () => {
      props.triggerLogin()
      props.resetAuthError()
    },
  }),
)

export default container
