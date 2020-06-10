import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { $hasData } from 'weplay-core/$utils/$hasData'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { withOnClickOutside } from 'weplay-components/withOnClickOutside'

import styles from './NotificationsPopup.scss'
import NotificationsControls from './NotificationsControls/NotificationsControls'
import NotificationsList from './NotificationsList'
import DummyNotification from './DummyNotification/DummyNotification'

const NotificationsPopup = ({
  notifications,
  isOpen,
  handleClose,
}) => {
  const isLoggedIn = useSelector(isLoggedInSelector)
  const isControlsVisible = useMemo(() => $hasData(notifications), [notifications])

  return (
    <div
      className={classNames(
        styles.block,
        { [styles.isOpen]: isOpen },
      )}
    >
      {isLoggedIn && (
        <div className={styles.container}>
          <NotificationsControls
            isVisible={isControlsVisible}
            onCloseButtonClick={handleClose}
          />
          <NotificationsList
            isOpen={isOpen}
            notifications={notifications}
          />
        </div>
      )}
      {(!isLoggedIn && isOpen) && (
        <DummyNotification />
      )}
    </div>
  )
}

NotificationsPopup.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default withOnClickOutside(NotificationsPopup)
