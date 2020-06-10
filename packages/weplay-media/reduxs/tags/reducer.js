import * as R from 'ramda'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { arrayToMapById, localizeWith } from 'weplay-core/reduxs/helpers'

import { MEDIA } from '../reducerName'

import { readTag, readTags } from './actions'

export const TAGS_RN = 'TAGS'
const READ_TAGS_RN = 'READ_TAGS'
const READ_TAG_RN = 'READ_TAG'
export default combineReducers({
  [READ_TAGS_RN]: createRequestReducer(readTags, {
    [readTags.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        ...arrayToMapById(payload),
      },
      loading: false,
      error: null,
    }),
    [readTag.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        [payload.tagId]: {
          ...payload,
        },
      },
      loading: false,
      error: null,
    }),
  }),
  [READ_TAG_RN]: createRequestReducer(readTag, {
    [readTag.SUCCESS]: () => ({
      data: null,
      loading: false,
      error: false,
    }),
  }),
})

export const tagsAsyncSelectors = createRequestSelectors([MEDIA, TAGS_RN, READ_TAGS_RN])
export const isTagsLoadingSelector = tagsAsyncSelectors.loadingSelector
export const createTagByIdSelector = mapPropsToId => createSelector(
  [(state, props) => mapPropsToId(props), tagsAsyncSelectors.dataSelector, currentLanguageSelector],
  (id, tagsById, currentLanguage) => R.pipe(
    R.prop(id),
    localizeWith(currentLanguage),
    R.defaultTo({}),
  )(tagsById),
)
