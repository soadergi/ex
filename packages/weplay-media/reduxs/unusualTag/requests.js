import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'
import config from 'weplay-core/config'

const UNUSUAL_TAGS_URL = `/${config.tagsApi.url}/unusual-tags`

export const readUnusualTagRequest = ({
  unusualTagId,
}) => axios.get(`${UNUSUAL_TAGS_URL}/${unusualTagId}`)
  .then(response => camelizeKeys(response.data))

export const readUnusualTagsRequest = ({
  language,
  limit,
  offset,
}) => axios.get(`${UNUSUAL_TAGS_URL}`, {
  params: {
    language,
    limit,
    offset,
  },
})
  .then(response => camelizeKeys(response.data.data))
