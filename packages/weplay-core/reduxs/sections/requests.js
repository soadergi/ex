import * as R from 'ramda'

import { axios } from '../../services/axios'
import { camelizeKeys } from '../helpers'

const SECTIONS_URL = '/media-service/sections'

export const getSectionsRequest = params => axios
  .get(SECTIONS_URL, { params })
  .then(R.prop('data'))
  .then(camelizeKeys)
