import * as R from 'ramda'

import { camelizeKeys } from 'weplay-core/reduxs/helpers'
import { axios } from 'weplay-core/services/axios'
import config from 'weplay-core/config'

export const getUserNotificationsRequest = params => axios.get(`${config.notificationsApi.url}
/v1/notifications/me`, params)
  .then(R.prop('data'))
  .then(camelizeKeys)

export const deleteNotificationsRequest = data => axios.delete(`${config.notificationsApi.url}/v1/
notifications/bulk-actions`, data)
  .then(() => (data.data.notification_ids))

export const markNotificationsAsReadRequest = data => axios.patch(`${config.notificationsApi.url}/v1/
notifications/bulk-actions`, { notification_ids: data })
  .then(() => (data))

export const markAllNotificationsAsReadRequest = () => axios.patch(`${config.notificationsApi.url}/v1/
notifications/bulk-actions?mark_all_as_read=true`, { notification_ids: [] })
// TODO endpoint does not support empty request body
