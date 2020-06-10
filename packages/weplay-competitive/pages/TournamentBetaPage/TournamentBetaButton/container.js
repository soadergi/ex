import {
  compose,
  withHandlers,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { updateUser } from 'weplay-core/reduxs/_legacy/auth/actions'
import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'

const container = compose(
  withAnalytics,
  connect(createStructuredSelector({
    // selectors
    isLoggedIn: isLoggedInSelector,
  }), {
    // actionCreators
    updateUser,
    openLoginModal,
  }),
  withHandlers({
    handleClick: props => () => {
      const {
        openLoginModal, // eslint-disable-line no-shadow
        logAnalytics,
        analyticEvent,
      } = props
      if (analyticEvent) {
        logAnalytics(analyticEvent)
      }
      return openLoginModal()
    },
  }),
)

export default container
