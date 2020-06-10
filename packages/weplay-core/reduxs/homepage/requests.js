import * as R from 'ramda'

import config from 'weplay-core/config'

import { axios } from '../../services/axios'
import { camelizeKeys } from '../helpers'

const HOMEPAGE_URL = `/${config.mediaApi.url}/homepage`

export const readHomepageRequest = () => axios
  .get(HOMEPAGE_URL)
  .then(R.prop('data'))
  .then(camelizeKeys)
