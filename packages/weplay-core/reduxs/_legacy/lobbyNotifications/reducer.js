import * as R from 'ramda'
import { createSelector } from 'reselect'

import { DEFAULT_NOTIFICATION_TYPES } from './consts'
import {
  TOGGLE_NOTIFICATION,
} from './actions'

const initialState = {
  notification: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NOTIFICATION:
      return {
        ...state,
        notification: action.data,
      }
    default:
      return state
  }
}
export const LOBBY_NOTIFICATIONS_RN = 'LOBBY_NOTIFICATIONS'
const rootNotificationSelector = R.prop(LOBBY_NOTIFICATIONS_RN)
export const notificationSelector = createSelector(
  [rootNotificationSelector],
  R.prop('notification'),
)
export const isDefaultNotificationSelector = createSelector(
  [notificationSelector],
  R.pipe(
    R.defaultTo({}),
    R.prop('type'),
    type => DEFAULT_NOTIFICATION_TYPES.includes(type),
  ),
)
