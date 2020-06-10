import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'

import styles from './NotificationsBellButton.scss'

const NotificationsBellButton = ({
  className,
  onClick,
  hasUnreadNotifications,
}) => (
  <button
    type="button"
    aria-label="notification"
    className={classNames(
      className,
      styles.block,
      { [styles.hasNotification]: hasUnreadNotifications },
    )}
    onClick={onClick}
  >
    <Icon iconName="notification-contained" />
  </button>
)

NotificationsBellButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  hasUnreadNotifications: PropTypes.bool,
}

NotificationsBellButton.defaultProps = {
  className: '',
  hasUnreadNotifications: false,
}

export default NotificationsBellButton
