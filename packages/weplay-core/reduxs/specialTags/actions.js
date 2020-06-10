import { createRequestActions } from '../_factories/request/createRequestActions'

import { readSpecialTagRequest, readSpecialTagsRequest } from './requests'

const READ_SPECIAL_TAG = 'READ_SPECIAL_TAG'
export const readSpecialTag = createRequestActions(READ_SPECIAL_TAG, readSpecialTagRequest)

const READ_SPECIAL_TAGS = 'READ_SPECIAL_TAGS'
export const readSpecialTags = createRequestActions(READ_SPECIAL_TAGS, readSpecialTagsRequest)
