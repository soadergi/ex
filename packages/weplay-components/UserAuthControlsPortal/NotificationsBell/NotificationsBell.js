import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { $hasData } from 'weplay-core/$utils/$hasData'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { userNotificationsSelector, userUnreadNotificationsSelector } from 'weplay-core/reduxs/notifications/reducer'

import styles from './NotificationsBell.scss'
import NotificationsBellButton from './NotificationsBellButton/NotificationsBellButton'
import NotificationsPopup from './NotificationsPopup/NotificationsPopup'

const NotificationsBell = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const isLoggedIn = useSelector(isLoggedInSelector)
  const userNotifications = useSelector(userNotificationsSelector)
  const userUnreadNotifications = useSelector(userUnreadNotificationsSelector)

  const hasUnreadNotifications = useMemo(
    () => $hasData(userUnreadNotifications) || !isLoggedIn,
    [userUnreadNotifications],
  )

  const togglePopup = useCallback(() => setIsPopupOpen(!isPopupOpen), [isPopupOpen, setIsPopupOpen])
  const closePopup = useCallback(() => setIsPopupOpen(false), [setIsPopupOpen])

  return (
    <>
      <NotificationsBellButton
        className={styles.notification}
        onClick={togglePopup}
        hasUnreadNotifications={hasUnreadNotifications}
      />

      <NotificationsPopup
        notifications={userNotifications}
        isOpen={isPopupOpen}
        handleClose={closePopup}
        outsideClickIgnoreClass={styles.notification}
        handleClickOutside={closePopup}
      />
    </>
  )
}

export default NotificationsBell
