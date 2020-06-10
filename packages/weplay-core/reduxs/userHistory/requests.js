import * as R from 'ramda'

import { camelizeKeys } from 'weplay-core/reduxs/helpers'
import { axios } from 'weplay-core/services/axios'

const USER_HISTORY_URL = '/media-service/news-views-history'

export const getUserHistoryRequest = params => axios
  .get(`${USER_HISTORY_URL}/search`, { params })
  .then(R.prop('data'))
  .then(camelizeKeys)

export const saveToHistoryRequest = news => axios
  .post(USER_HISTORY_URL, { news })
  .then(
    R.prop('data'),
    R.pipe(
      R.path(['response', 'data']), // axios
      R.prop(['error']),
      error => Promise.reject(error),
    ),
  )

export const deleteUserHistoryRequest = params => axios
  .delete(USER_HISTORY_URL, { params })
  .then(() => true)

export const deleteHistoryByIdRequest = id => axios
  .delete(`${USER_HISTORY_URL}/${id}`)
  .then(() => ({ id }))
