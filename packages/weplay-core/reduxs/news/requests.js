import * as R from 'ramda'

import { axios } from '../../services/axios'
import { camelizeKeys, snakeizeKeys } from '../helpers'

const NEWS_URL = '/media-service/news'

export const readNewsRequest = params => axios
  .get(NEWS_URL, { params: snakeizeKeys(params) })
  .then(R.prop('data'))
  .then(camelizeKeys)

export const readNewspaperRequest = params => axios
  .get(NEWS_URL, {
    params: {
      ...snakeizeKeys(params),
      detailed: 1,
    },
  })
  .then(R.prop('data'))
  .then(camelizeKeys)

export const incrementNewspaperViewsRequest = params => axios
  .put(`${NEWS_URL}/increment/views`, snakeizeKeys(params))
