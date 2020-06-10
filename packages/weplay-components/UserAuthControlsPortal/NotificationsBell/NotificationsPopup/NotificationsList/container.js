import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { currentLanguageSelector, i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import {
  notificationsPaginationInfoSelector,
} from 'weplay-core/reduxs/notifications/reducer'
import {
  deleteNotifications,
  getMoreNotifications,
} from 'weplay-core/reduxs/notifications/actions'

const maxNotifications = 7
const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    paginationInfo: notificationsPaginationInfoSelector,
  }), {
    // actionCreators
    deleteNotifications: deleteNotifications.request,
    getMoreNotifications: getMoreNotifications.request,
  }),

  withPropsOnChange([
    'notifications',
    'paginationInfo',
  ], ({
    notifications,
    paginationInfo,
  }) => ({
    notificationsIds: R.map(
      R.prop('id'),
    )(notifications),
    hasMore: notifications.length < paginationInfo.total,
  })),
  withHandlers({
    getMoreNotifications: props => () => {
      props.getMoreNotifications({
        params: {
          'page[offset]': props.paginationInfo.offset + props.paginationInfo.limit,
          'page[limit]': 20,
          sort: '-create_datetime',
        },
      })
    },
  }),
  withHandlers({
    handleDeleteNotification: props => (id) => {
      props.deleteNotifications({
        data: {
          notification_ids: [id],
        },
      }).then(() => {
        if (props.hasMore && props.notifications.length < maxNotifications) {
          props.getMoreNotifications()
        }
      })
    },
  }),
)

export default container
