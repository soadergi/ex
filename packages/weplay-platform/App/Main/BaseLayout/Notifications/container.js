import {
  compose, withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { notificationSelector } from 'weplay-core/reduxs/_legacy/lobbyNotifications/reducer'
import {
  toggleNotification,
} from 'weplay-core/reduxs/_legacy/lobbyNotifications/actions'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    // TODO @illia refactore after 20.02.19
    notification: notificationSelector,
  }), {
    // actionCreators
    toggleNotification,
  }),
  withHandlers({
    closeNotification: ({
      toggleNotification, // eslint-disable-line no-shadow
    }) => () => toggleNotification(null),
  }),
)

export default container
