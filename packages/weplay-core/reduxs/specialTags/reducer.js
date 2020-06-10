import * as R from 'ramda'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'

import { createRequestSelectors } from '../_factories/request/createRequestSelectors'
import { createRequestReducer } from '../_factories/request/createRequestReducer'
import { currentLanguageSelector } from '../language/reducer'
import { arrayToMapById } from '../helpers'
import { getSections } from '../sections/actions'

import { readSpecialTag, readSpecialTags } from './actions'

export const SPECIAL_TAGS_RN = 'SPECIAL_TAGS'
const READ_SPECIAL_TAG_RN = 'READ_SPECIAL_TAG'
const READ_SPECIAL_TAGS_RN = 'READ_SPECIAL_TAGS'

// TODO: make from this factory
export default combineReducers({
  // reducer READ_SPECIAL_TAGS_RN should be one source of data,
  // the other exist only for errors and loading
  [READ_SPECIAL_TAGS_RN]: createRequestReducer(readSpecialTags, {
    [readSpecialTags.SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: null,
      data: {
        ...state.data,
        specialTagsById: {
          ...R.pathOr({}, ['data', 'specialTagsById'], state),
          ...arrayToMapById(payload.data, 'specialTagTranslateId'),
        },
        paginationInfo: payload.paginationInfo,
      },
    }),
    [readSpecialTag.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        specialTagsById: {
          ...R.pathOr({}, ['data', 'specialTagsById'], state),
          ...R.pipe(
            R.values,
            specialTags => arrayToMapById(specialTags, 'specialTagTranslateId'),
          )(payload),
        },
      },
    }),
    [getSections.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        specialTagsById: {
          ...R.pathOr({}, ['data', 'specialTagsById'], state),
          ...R.pipe(
            R.propOr([], 'topSlider'),
            R.filter(R.has('specialTagTranslateId')),
            specialTags => arrayToMapById(specialTags, 'specialTagTranslateId'),
          )(payload),
        },
      },
    }),
  }),
  [READ_SPECIAL_TAG_RN]: createRequestReducer(readSpecialTag),
})

const specialTagsAsyncSelectors = createRequestSelectors([SPECIAL_TAGS_RN, READ_SPECIAL_TAGS_RN])
const specialTagAsyncSelectors = createRequestSelectors([SPECIAL_TAGS_RN, READ_SPECIAL_TAG_RN])

export const isSpecialTagLoadingSelector = specialTagAsyncSelectors.loadingSelector
export const isSpecialTagsLoadingSelector = specialTagsAsyncSelectors.loadingSelector

export const specialTagsHasErrorSelector = createSelector(
  [specialTagsAsyncSelectors.errorSelector],
  Boolean,
)
const specialTagsByIdSelectors = createSelector(
  [specialTagsAsyncSelectors.dataSelector],
  R.propOr({}, 'specialTagsById'),
)
const specialTagsPaginationInfoSelector = createSelector(
  [specialTagsAsyncSelectors.dataSelector],
  R.propOr(null, 'paginationInfo'),
)

export const specialTagsCountSelector = createSelector(
  [specialTagsPaginationInfoSelector],
  R.propOr(0, 'count'),
)

export const specialTagsHasMoreSelector = createSelector(
  [specialTagsPaginationInfoSelector, specialTagsHasErrorSelector],
  (paginationInfo, specialTagsHasError) => {
    if (specialTagsHasError) {
      return false
    }
    if (!paginationInfo) {
      return true
    }
    return paginationInfo.count > paginationInfo.offset + paginationInfo.limit
  },
)
export const createSpecialTagsPageSelector = mapPropsToPageSize => createSelector(
  [specialTagsPaginationInfoSelector, (state, props) => mapPropsToPageSize(props)],
  (paginationInfo, pageSize) => {
    if (!paginationInfo) {
      return 0
    }
    return Math.ceil((paginationInfo.offset + paginationInfo.limit) / pageSize)
  },
)
export const specialTagsSelector = createSelector(
  [specialTagsByIdSelectors],
  R.values,
)

export const createSpecialTagByIdSelector = mapPropsToSpecialTagId => createSelector(
  [(state, props) => mapPropsToSpecialTagId(props), specialTagsSelector, currentLanguageSelector],
  (specialTagId, specialTags, currentLanguage) => R.pipe(
    R.filter(R.propEq('specialTagId', Number(specialTagId))),
    R.find(R.propEq('language', currentLanguage)),
  )(specialTags),
)

export const createSpecialTagByTranslateIdSelector = mapPropsToTranslateId => createSelector(
  [(state, props) => mapPropsToTranslateId(props), specialTagsSelector],
  (translateId, specialTags) => R.pipe(
    R.find(R.propEq('specialTagTranslateId', translateId)),
    R.defaultTo({}),
  )(specialTags),
)

export const specialTagsByLangSelector = createSelector(
  [specialTagsSelector, currentLanguageSelector],
  (specialTags, currentLanguage) => R.pipe(
    R.filter(R.propEq('language', currentLanguage)),
    R.sortWith([
      R.descend(R.prop('specialTagId')),
    ]),
  )(specialTags),
)

export const createSpecialTagAllTagsSelector = mapPropsToTranslateId => createSelector(
  [createSpecialTagByTranslateIdSelector(mapPropsToTranslateId)],
  R.pipe(
    R.props(['tags', 'unusualTags']),
    R.flatten,
    R.filter(item => !R.isNil(item)),
    R.sort(R.descend(R.prop('articlesCount'))),
  ),
)
