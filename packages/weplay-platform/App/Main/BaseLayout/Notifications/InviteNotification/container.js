import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { notificationSelector } from 'weplay-core/reduxs/_legacy/lobbyNotifications/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    notification: notificationSelector,
  }), {
    // actionCreators
  }),
)

export default container
