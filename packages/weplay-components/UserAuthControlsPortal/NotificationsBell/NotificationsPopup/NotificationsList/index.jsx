import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'

import MessageBanner from 'weplay-components/MessageBanner'
import InfiniteScroll from 'weplay-components/InfiniteScrollLoadable/loadable'

import messageImage from './img/empty-state.svg'
import Notification from './Notification'
import container from './container'
import styles from './styles.scss'

const notificationMods = ['popup']

const NotificationsList = ({
  notifications,
  i18nTexts,
  handleDeleteNotification,
  isOpen,
  getMoreNotifications,
  hasMore,
}) => (
  <InfiniteScroll
    initialLoad={false}
    loadMore={getMoreNotifications}
    hasMore={hasMore}
    useWindow={false}
  >
    <div className={styles.block}>
      {!R.isEmpty(notifications) ? (notifications.map(notification => (
        <Notification
          key={notification.id}
          notification={notification}
          handleDeleteNotification={handleDeleteNotification}
          isOpen={isOpen}
        />
      )))
        : (
          <MessageBanner
            className={styles.empty}
            modifiers={notificationMods}
            imageUrl={messageImage}
            title={i18nTexts.header.notifications.emptyStateTitle}
          >
            <p className={styles.message}>
              {i18nTexts.header.notifications.emptyStateText}
            </p>
          </MessageBanner>
        )}

    </div>
  </InfiniteScroll>

)

NotificationsList.propTypes = {
  // required props
  notifications: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  // optional props
  handleDeleteNotification: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  getMoreNotifications: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
}

NotificationsList.defaultProps = {
  // optional props

}

export default container(NotificationsList)
