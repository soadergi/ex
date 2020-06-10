import * as R from 'ramda'
import { camelizeKeys, snakeizeKeys } from 'weplay-core/reduxs/helpers'
import { axios } from 'weplay-core/services/axios'

const LIVE_COMMENTS_URL = '/comment-service/feed'

export const readLiveCommentsRequest = params => axios
  .get(LIVE_COMMENTS_URL, { params: { ...snakeizeKeys(params) } })
  .then(R.prop('data'))
  .then(camelizeKeys)
