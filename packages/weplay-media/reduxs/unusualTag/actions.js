import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { readUnusualTagRequest, readUnusualTagsRequest } from './requests'

const READ_UNUSUAL_TAG = 'READ_UNUSUAL_TAG'
export const readUnusualTag = createRequestActions(READ_UNUSUAL_TAG, readUnusualTagRequest)

const READ_UNUSUAL_TAGS = 'READ_UNUSUAL_TAGS'
export const readUnusualTags = createRequestActions(READ_UNUSUAL_TAGS, readUnusualTagsRequest)
