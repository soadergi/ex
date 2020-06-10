import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { readAllTagsRequest } from './requests'

const READ_ALL_TAGS = 'READ_ALL_TAGS'
export const readAllTags = createRequestActions(READ_ALL_TAGS, readAllTagsRequest)
