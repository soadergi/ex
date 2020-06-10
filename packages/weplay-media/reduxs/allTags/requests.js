import config from 'weplay-core/config'
import { axios } from 'weplay-core/services/axios'
import { camelizeKeys, snakeizeKeys } from 'weplay-core/reduxs/helpers'

const ALL_TAGS_URL = `/${config.tagsApi.url}/all-tags`

export const readAllTagsRequest = params => axios
  .get(ALL_TAGS_URL, { params: { ...snakeizeKeys(params) } })
  .then(res => camelizeKeys(res.data?.data))
