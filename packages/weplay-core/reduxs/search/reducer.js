import * as R from 'ramda'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'

import { createRequestReducer } from '../_factories/request/createRequestReducer'
import { createRequestSelectors } from '../_factories/request/createRequestSelectors'

import {
  makeSearch,
} from './actions'

export const SEARCH_RESULT_RN = 'SEARCH_RESULT'
const SEARCH_RN = 'SEARCH'

export default combineReducers({
  [SEARCH_RN]: createRequestReducer(makeSearch, {
    [makeSearch.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        newsIds: R.concat(R.pathOr([], ['data', 'newsIds'])(state),
          R.map(R.prop('newsId'))(payload.data)),
        paginationInfo: payload.paginationInfo,
      },
      loading: false,
      error: null,
    }),
  }),
})

const searchAsyncSelectors = createRequestSelectors([SEARCH_RESULT_RN, SEARCH_RN])

export const isSearchResultsLoadingSelector = searchAsyncSelectors.loadingSelector

export const searchResultsIdsSelector = createSelector(
  [searchAsyncSelectors.dataSelector],
  R.pathOr([], ['newsIds']),
)

export const searchResultsPaginationSelector = createSelector(
  [searchAsyncSelectors.dataSelector],
  R.pathOr({}, ['paginationInfo']),
)
