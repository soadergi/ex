import * as R from 'ramda'

import { axios } from '../../services/axios'
import { camelizeKeys } from '../helpers'

const NEWS_URL = '/media-service/news'

export const makeSearchRequest = params => axios
  .get(`${NEWS_URL}/search`, params)
  .then(R.prop('data'))
  .then(camelizeKeys)
