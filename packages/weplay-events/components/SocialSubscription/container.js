import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { triggerSignUpModal } from 'weplay-core/reduxs/_legacy/modals/actions'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
    triggerSignUpModal,
  }),
)

export default container
