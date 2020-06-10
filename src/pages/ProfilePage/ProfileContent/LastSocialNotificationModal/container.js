import {
  compose,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  triggerForgotPassModal,
} from 'weplay-core/reduxs/_legacy/modals/actions'

const container = compose(
  connect(createStructuredSelector({
  }), {
    // actionCreators
    triggerForgotPassModal,
  }),
  withHandlers({
    handleClick: props => () => {
      props.toggleLastSocialNotificationModal()
      props.triggerForgotPassModal()
    },
  }),
)

export default container
