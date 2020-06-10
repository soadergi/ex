import * as R from 'ramda'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'

import { arrayToMapById } from 'weplay-core/reduxs/helpers'

import { createRequestReducer } from '../_factories/request/createRequestReducer'
import { createRequestSelectors } from '../_factories/request/createRequestSelectors'

import { notificationTypes } from './config'
import {
  getUserNotifications,
  getMoreNotifications,
  deleteNotifications,
  markNotificationsAsRead,
} from './actions'

export const NOTIFICATIONS_RN = 'NOTIFICATIONS'
const GET_NOTIFICATIONS_RN = 'GET_NOTIFICATIONS'

export default combineReducers({
  [GET_NOTIFICATIONS_RN]: createRequestReducer(getUserNotifications, {
    [getUserNotifications.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        notifications: arrayToMapById(payload.data),
        paginationInfo: payload.meta.pagination.pagination,
      },
      loading: false,
    }),
    [getMoreNotifications.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        notifications: {
          ...R.path(['data', 'notifications'], state),
          ...arrayToMapById(payload.data),
        },
        paginationInfo: payload.meta.pagination.pagination,
      },
      loading: false,
    }),
    [deleteNotifications.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        notifications: R.omit(payload, state.data.notifications),
        paginationInfo: {
          ...state.data.paginationInfo,
          offset: R.dec(state.data.paginationInfo.offset),
          total: R.dec(state.data.paginationInfo.total),
        },
      },
      loading: false,
    }),
    [markNotificationsAsRead.SUCCESS]: (state, { payload }) => R.assocPath(
      ['data', 'notifications', payload[0], 'attributes', 'read'],
      // TODO payload[0] working only for 1 notification in batch action wee need to map array
      true,
      state,
    ),
  }),
})
const userNotificationsAsyncSelectors = createRequestSelectors([NOTIFICATIONS_RN, GET_NOTIFICATIONS_RN])
export const isNotificationsLoadingSelector = userNotificationsAsyncSelectors.loadingSelector

export const userNotificationsSelector = createSelector(
  [userNotificationsAsyncSelectors.dataSelector],
  R.pipe(
    R.propOr({}, 'notifications'),
    R.values,
    R.sort(R.descend(R.path(['attributes', 'createDatetime']))),
    R.filter(notification => notificationTypes.includes(notification.attributes?.notificationType)),
  ),
)
export const isUserHasNotificationsSelector = createSelector(
  [userNotificationsSelector],
  R.complement(R.isEmpty),
)
export const userUnreadNotificationsSelector = createSelector(
  [userNotificationsSelector],
  R.filter(R.pathEq(['attributes', 'read'], false)),
)

export const notificationsPaginationInfoSelector = createSelector(
  [userNotificationsAsyncSelectors.dataSelector],
  R.pipe(
    R.prop('paginationInfo'),
    R.defaultTo({}),
  ),
)
