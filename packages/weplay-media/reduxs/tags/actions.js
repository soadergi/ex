import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { readTagRequest, readTagsRequest } from 'weplay-media/reduxs/tags/requests'

const READ_TAG = 'READ_TAG'
export const readTag = createRequestActions(READ_TAG, readTagRequest)

const READ_TAGS = 'READ_TAGS'
export const readTags = createRequestActions(READ_TAGS, readTagsRequest)
