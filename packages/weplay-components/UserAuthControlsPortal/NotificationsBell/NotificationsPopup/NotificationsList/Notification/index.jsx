import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'
import DividedDateTime from 'weplay-components/DividedDateTime'

import { useNotification } from './container'
import styles from './styles.scss'

const Notification = ({
  notification,
  handleDeleteNotification,
}) => {
  const {
    isDeleteNotification,
    toggleDeleteNotification,
    deleteNotification,
    markNotificationAsRead,
    notificationText,
  } = useNotification({ notification, handleDeleteNotification })
  const t = useTranslation()

  return (
    <div className={styles.block}>
      {!isDeleteNotification ? (
        <div
          className={classNames(
            styles.content,
            { [styles.isUnread]: !notification.attributes.read },
          )}
        >
          <div className={styles.icon}>
            <Icon iconName="weplay" />
          </div>

          <div
            className={styles.textWrap}
            onClick={markNotificationAsRead}
          >
            <p
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: notificationText }}
            />

            <div className={styles.btnWrap}>
              <span className="u-text-bold">
                {notification.tag}
              </span>
              <span className={styles.date}>
                <DividedDateTime
                  dateTime={notification.attributes.createDatetime}
                  formatDate="monthDateYear"
                  formatTime="24h"
                />
              </span>
            </div>
          </div>
          {/*
          <Button
            className={styles.button}
            priority={BUTTON_PRIORITY.GHOST}
            onClick={toggleDeleteNotification}
          >
            <Icon iconName="trash" />
          </Button> */}
        </div>
      ) : (
        <div className={styles.alert}>

          <p className={styles.message}>
            <span className={styles.icon}>
              <Icon iconName="trash" />
            </span>

            <span className="u-ml-1">{t('header.notifications.deleteTitle')}</span>
          </p>

          <div className={styles.controlsWrap}>
            <Button
              className={classNames(
                styles.alertButton,
                styles.remove,
              )}
              color={BUTTON_COLOR.DANGER}
              onClick={deleteNotification}
            >
              {t('header.notifications.deleteButton')}
            </Button>

            <Button
              className={styles.alertButton}
              priority={BUTTON_PRIORITY.GHOST}
              onClick={toggleDeleteNotification}
            >
              {t('header.notifications.cancelButton')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

Notification.propTypes = {
  // required props
  notification: PropTypes.shape({
    attributes: PropTypes.shape({
      read: PropTypes.bool.isRequired,
      createDatetime: PropTypes.string.isRequired,
    }),
    message: PropTypes.shape({
      text: PropTypes.string,
      date: PropTypes.string,
      time: PropTypes.string,
      id: PropTypes.string,
      tag: PropTypes.string,
    }),
    alertNotice: PropTypes.shape({
      text: PropTypes.string,
      remove: PropTypes.string,
      cancel: PropTypes.string,
    }),
    tag: PropTypes.string,
  }).isRequired,
  handleDeleteNotification: PropTypes.func.isRequired,
}

Notification.defaultProps = {
  // optional props
}

export default React.memo(Notification)
