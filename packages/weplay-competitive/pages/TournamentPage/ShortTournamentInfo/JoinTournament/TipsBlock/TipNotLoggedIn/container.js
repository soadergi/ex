import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import connect from 'react-redux/es/connect/connect'

import { openLoginModal, triggerSignUpModal } from 'weplay-core/reduxs/_legacy/modals/actions'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    openLoginModal,
    triggerSignUpModal,
    // actionCreators
  }),
)

export default container
