import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'
import InviteNotification from './InviteNotification'
import DefaultNotification from './DefaultNotification'
// TODO: VERY VERY TEMP SOLUTION, NEEDED CAREFULL ARCHITECTURE
// TODO: @Andrew, Remove this component after refactor tournament Notification to a popup
// because this component is used for Tournament only. Other notifications are worked by Toaster
const Notifications = ({
  notification,
  closeNotification,
}) => (
  <div className={classNames(
    styles.container,
    {
      [styles.isShown]: notification,
    },
  )}
  >
    {notification && (
      <div className={classNames(
        styles.wrapper,
        styles[notification.type],
      )}
      >
        {notification.type === 'invite' && (
          <InviteNotification
            matchLink={notification.data.matchLink}
            closeNotification={closeNotification}
          />
        )}
        {notification.type === 'error' && (
          <DefaultNotification
            text={notification.data.text}
            closeNotification={closeNotification}
          />
        )}
      </div>
    )}
  </div>
)

Notifications.propTypes = {
  // container
  closeNotification: PropTypes.func.isRequired,
  // optional
  notification: PropTypes.shape({
    type: PropTypes.oneOf(['invite', 'error']).isRequired,
    data: PropTypes.shape({
      matchLink: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  }),
}
Notifications.defaultProps = {
  // optional
  notification: null,
}

export default container(Notifications)
