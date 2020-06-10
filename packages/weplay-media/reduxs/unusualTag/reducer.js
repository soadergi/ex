import * as R from 'ramda'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { arrayToMapById, localizeWith } from 'weplay-core/reduxs/helpers'

import { MEDIA } from '../reducerName'

import { readUnusualTag, readUnusualTags } from './actions'

export const UNUSUAL_TAGS_RN = 'UNUSUAL_TAGS'
const READ_UNUSUAL_TAGS_RN = 'READ_UNUSUAL_TAGS'
const READ_UNUSUAL_TAG_RN = 'READ_UNUSUAL_TAG'
export default combineReducers({
  [READ_UNUSUAL_TAGS_RN]: createRequestReducer(readUnusualTags, {
    [readUnusualTags.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        ...arrayToMapById(payload),
      },
    }),
    [readUnusualTag.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        [payload.tagId]: {
          ...payload,
        },
      },
    }),
  }),
  [READ_UNUSUAL_TAG_RN]: createRequestReducer(readUnusualTag),
})

const unusualTagsAsyncSelectors = createRequestSelectors([MEDIA, UNUSUAL_TAGS_RN, READ_UNUSUAL_TAGS_RN])

export const createUnusalTagByIdSelector = mapPropsToId => createSelector(
  [(state, props) => mapPropsToId(props), unusualTagsAsyncSelectors.dataSelector, currentLanguageSelector],
  (id, unusualTagsById, currentLanguage) => R.pipe(
    R.prop(id),
    localizeWith(currentLanguage),
  )(unusualTagsById),
)
