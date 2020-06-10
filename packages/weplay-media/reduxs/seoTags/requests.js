import * as R from 'ramda'

import config from 'weplay-core/config'
import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

const SEO_TAGS_URL = `/${config.tagsApi.url}/seo/tags`

export const readSeoTagsRequest = language => axios
  .get(SEO_TAGS_URL, { params: { language } })
  .then(R.pipe(
    R.path(['data', 'data']),
    camelizeKeys,
  ))
