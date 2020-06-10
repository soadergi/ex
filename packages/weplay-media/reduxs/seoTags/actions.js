import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { readSeoTagsRequest } from './requests'

const READ_SEO_TAGS = 'READ_SEO_TAGS'
export const readSeoTags = createRequestActions(READ_SEO_TAGS, readSeoTagsRequest)
