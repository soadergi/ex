import { createReduxAction } from '../reduxHelpers'

export const TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION'

export const toggleNotification = createReduxAction(TOGGLE_NOTIFICATION)
