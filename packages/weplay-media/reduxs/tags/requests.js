import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'
import config from 'weplay-core/config'

const TAGS_URL = `/${config.tagsApi.url}/tags`

export const readTagRequest = ({
  tagId,
}) => axios.get(`${TAGS_URL}/${tagId}`)
  .then(response => camelizeKeys(response.data))

export const readTagsRequest = params => axios.get(`${TAGS_URL}`, { params })
  .then(response => camelizeKeys(response.data.data))
