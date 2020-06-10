import {
  compose, withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { openLoginModal, triggerSignUpModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { isBellSourceSelector } from 'weplay-core/reduxs/_legacy/modals/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isBellSource: isBellSourceSelector,
  }), {
    // actionCreators
    triggerSignUp: triggerSignUpModal,
    openLoginModal,
  }),
  withHandlers({
    handleRedirectToLogin: ({
      triggerSignUp,
      openLoginModal, // eslint-disable-line no-shadow
      isBellSource,
    }) => () => {
      triggerSignUp()
      openLoginModal({ isBellSource })
    },
  }),
)

export default container
