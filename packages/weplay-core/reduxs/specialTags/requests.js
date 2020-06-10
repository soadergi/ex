import config from 'weplay-core/config'

import { axios } from '../../services/axios'
import { camelizeKeys } from '../helpers'

const SPECIAL_TAGS_URL = `/${config.tagsApi.url}/special-tags`

export const readSpecialTagRequest = ({
  specialTagId,
}) => axios.get(`${SPECIAL_TAGS_URL}/${specialTagId}`)
  .then(response => response.data) // because single API
  .then(specialTag => camelizeKeys(specialTag))

export const readSpecialTagsRequest = params => axios.get(`${SPECIAL_TAGS_URL}`, { params })
  .then(response => camelizeKeys(response.data))
