import * as R from 'ramda'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import { createRequestReducer } from '../_factories/request/createRequestReducer'
import { createRequestSelectors } from '../_factories/request/createRequestSelectors'
import { readNews } from '../news/actions'

import { getSections } from './actions'

export const SECTIONS_RN = 'SECTIONS'
const GET_SECTIONS_RN = 'GET_SECTIONS'
const TOP_SLIDER_NEWS_MAX_NUMBER = 3
export default combineReducers({
  [GET_SECTIONS_RN]: createRequestReducer(getSections, {
    [getSections.SUCCESS]: (state, { payload }) => ({
      data: {
        ...R.mapObjIndexed(
          (value, key) => ({
            newsIds: R.pipe(
              R.prop(key),
              R.filter(R.prop('newsId')),
              R.map(R.prop('newsId')),
            )(payload),
          }),
        )(payload),
        topSlider: {
          entities: R.pipe(
            R.propOr([], 'topSlider'),
          )(payload),
        },
      },
      loading: false,
      error: null,
    }),
    [readNews.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        latest: {
          newsIds: R.uniq(
            R.concat(
              R.pathOr([], ['data', 'latest', 'newsIds'], state),
              R.map(R.prop('newsId'), payload.data),
            ),
          ),
        },
      },
    }),
  }),
})

const sectionsAsyncSelectors = createRequestSelectors([SECTIONS_RN, GET_SECTIONS_RN])
const sectionsDataSelector = sectionsAsyncSelectors.dataSelector

export const sectionsLoadingSelector = sectionsAsyncSelectors.loadingSelector

export const sectionsIsInitialStateSelector = createSelector(
  [sectionsDataSelector],
  R.isNil,
)

export const popularIdsSelector = createSelector(
  [sectionsDataSelector],
  R.pathOr([], ['popular', 'newsIds']),
)

export const topIdsSelector = createSelector(
  [sectionsDataSelector],
  R.pathOr([], ['top', 'newsIds']),
)

export const latestIdsSelector = createSelector(
  [sectionsDataSelector],
  R.pathOr([], ['latest', 'newsIds']),
)

export const topSliderNewsSelector = createSelector(
  [sectionsDataSelector],
  sections => sections?.topSlider?.entities?.slice(0, TOP_SLIDER_NEWS_MAX_NUMBER) ?? [],
)
