import { useState } from 'react'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import useAction from 'weplay-core/helpers/useAction'
import { markNotificationsAsRead } from 'weplay-core/reduxs/notifications/actions'

export const useNotification = ({ notification, handleDeleteNotification }) => {
  const { locale } = useLocale()

  const { markNotificationsAsReadRequest } = useAction(({
    markNotificationsAsReadRequest: markNotificationsAsRead.request,
  }))

  const [isDeleteNotification, setIsDeleteNotification] = useState(false)

  const notificationText = notification.attributes.text[locale]

  const toggleDeleteNotification = () => {
    setIsDeleteNotification(state => !state)
  }

  const deleteNotification = () => {
    handleDeleteNotification(notification.id)
    toggleDeleteNotification()
  }

  const markNotificationAsRead = () => {
    if (!notification.read) {
      markNotificationsAsReadRequest(
        [notification.id],
      )
    }
  }

  return {
    toggleDeleteNotification,
    notificationText,
    deleteNotification,
    markNotificationAsRead,
    isDeleteNotification,
  }
}
