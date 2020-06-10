import { createSelector } from 'reselect'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'

import { MEDIA } from '../reducerName'

import { readSeoTags } from './actions'

export const SEO_TAGS_RN = 'SEO_TAGS'

export default createRequestReducer(readSeoTags)

const seoTagsAsyncSelectors = createRequestSelectors([MEDIA, SEO_TAGS_RN])
export const seoTagsSelector = createSelector(
  [seoTagsAsyncSelectors.dataSelector],
  tags => tags?.filter(tag => tag.name !== 'B2B') ?? [],
)
