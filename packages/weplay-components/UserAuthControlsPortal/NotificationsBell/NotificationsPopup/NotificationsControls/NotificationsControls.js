import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import useAction from 'weplay-core/helpers/useAction'
import {
  getUserNotifications as getUserNotificationsActions,
  markAllNotificationsAsRead as markAllNotificationsAsReadActions,
} from 'weplay-core/reduxs/notifications/actions'

import Icon from 'weplay-components/Icon'

import styles from './NotificationsContols.scss'

const NotificationsControls = ({
  isVisible,
  onCloseButtonClick,
}) => {
  const {
    markAllNotificationsAsRead,
    getUserNotifications,
  } = useAction({
    markAllNotificationsAsRead: markAllNotificationsAsReadActions.request,
    getUserNotifications: getUserNotificationsActions.request,
  })
  const t = useTranslation()

  const handleMarkAsReadButtonClick = useCallback(() => {
    markAllNotificationsAsRead()
      .then(() => getUserNotifications({
        params: {
          'page[offset]': 0,
          'page[limit]': 20,
          sort: '-create_datetime',
        },
      }))
  }, [markAllNotificationsAsRead, getUserNotifications])

  return (
    <div className={styles.block}>
      <p className={styles.title}>
        {t('header.notifications.title')}
      </p>

      <div className={styles.controlWrap}>
        <button
          className={classNames(
            styles.control,
            styles.button,
            { [styles.isVisible]: isVisible },
          )}
          onClick={handleMarkAsReadButtonClick}
          type="button"
        >
          <Icon iconName="check-outlined" />

          <span className={styles.text}>{t('header.notifications.markAsRead')}</span>
        </button>
        <button
          type="button"
          className={styles.close}
          onClick={onCloseButtonClick}
        >
          <Icon
            className={styles.icon}
            iconName="close"
          />
        </button>
      </div>
    </div>
  )
}

NotificationsControls.propTypes = {
  onCloseButtonClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
}

export default NotificationsControls
