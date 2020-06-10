import { createSelector } from 'reselect'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'

import { MEDIA } from '../reducerName'

import { readAllTags } from './actions'

export const ALL_TAGS_RN = 'ALL_TAGS'

export default createRequestReducer(readAllTags)

const allTagsAsyncSelectors = createRequestSelectors([MEDIA, ALL_TAGS_RN])
export const allTagsSelector = createSelector(
  [allTagsAsyncSelectors.dataSelector],
  tags => tags ?? [],
)
