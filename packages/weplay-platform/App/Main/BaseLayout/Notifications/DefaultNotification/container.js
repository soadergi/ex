import {
  compose, lifecycle, withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { toggleNotification } from 'weplay-core/reduxs/_legacy/lobbyNotifications/actions'
import { DEFAULT_NOTIFICATION_DURATION } from 'weplay-core/reduxs/_legacy/lobbyNotifications/consts'
import {
  isDefaultNotificationSelector,
} from 'weplay-core/reduxs/_legacy/lobbyNotifications/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isDefaultNotification: isDefaultNotificationSelector,
  }), {
    // actionCreators
    toggleNotification,
  }),
  withHandlers(() => {
    let timeoutId = null
    return {
      setTimeoutId: () => (newTimeoutId) => { timeoutId = newTimeoutId },
      getTimeoutId: () => () => timeoutId,
    }
  }),
  lifecycle({
    componentDidMount() {
      const timeoutId = setTimeout(() => {
        if (this.props.isDefaultNotification) {
          this.props.toggleNotification(null)
        }
      }, DEFAULT_NOTIFICATION_DURATION)
      this.props.setTimeoutId(timeoutId)
    },
    componentWillUnmount() {
      const timeoutId = this.props.getTimeoutId()
      clearTimeout(timeoutId)
    },
  }),
)

export default container
