import * as R from 'ramda'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'
import { SIGN_OUT } from 'weplay-core/reduxs/_legacy/auth/actions'
import { arrayToMapById } from 'weplay-core/reduxs/helpers'

import {
  getUserHistory,
  saveToUserHistory,
  deleteUserHistory,
  deleteHistoryById,
} from './actions'

export const USER_HISTORY_RN = 'USER_HISTORY'
export const SAVE_TO_HISTORY = 'SAVE_TO_HISTORY'
export const GET_USER_HISTORY_RN = 'GET_USER_HISTORY'
export const DELETE_USER_HISTORY_RN = 'DELETE_USER_HISTORY'

const USER_HISTORY_BY_ID = 'userHistoryById'

export default combineReducers({
  [SAVE_TO_HISTORY]: createRequestReducer(saveToUserHistory),
  [DELETE_USER_HISTORY_RN]: createRequestReducer(deleteUserHistory, {
    [deleteHistoryById.SUCCESS]: state => ({
      ...state,
      data: true,
    }),
  }),
  [GET_USER_HISTORY_RN]: createRequestReducer(getUserHistory, {
    [getUserHistory.SUCCESS]: (state, { payload }) => ({
      data: {
        ...state.data,
        [USER_HISTORY_BY_ID]: {
          ...(payload.paginationInfo.offset === 0
            ? { ...arrayToMapById(payload.data) }
            : {
              ...state.data[USER_HISTORY_BY_ID],
              ...arrayToMapById(payload.data, 'id', payload.paginationInfo.offset),
            }),
        },
        paginationInfo: payload.paginationInfo,
      },
      loading: false,
      error: null,
    }),
    [deleteUserHistory.SUCCESS]: state => ({
      ...state,
      data: {
        ...state.data,
        [USER_HISTORY_BY_ID]: {},
      },
    }),
    [deleteHistoryById.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        [USER_HISTORY_BY_ID]: {
          ...R.omit([payload.id], state.data[USER_HISTORY_BY_ID]),
        },
        paginationInfo: {
          ...state.data.paginationInfo,
          offset: R.dec(state.data.paginationInfo.offset),
          count: R.dec(state.data.paginationInfo.count),
        },
      },
    }),
    [SIGN_OUT.SUCCESS]: () => ({
      data: null,
      loading: false,
      error: false,
    }),
  }),
})

const deleteUserHistorySelector = createRequestSelectors([
  USER_HISTORY_RN,
  DELETE_USER_HISTORY_RN,
])
export const isDeletedUserArticleSelector = createSelector(
  [deleteUserHistorySelector.dataSelector],
  Boolean,
)

const userHistoryAsyncSelectors = createRequestSelectors([
  USER_HISTORY_RN,
  GET_USER_HISTORY_RN,
])
export const isUserHistoryLoadingSelector = userHistoryAsyncSelectors.loadingSelector
const isUserHistoryErrorSelector = createSelector(
  [userHistoryAsyncSelectors.errorSelector],
  Boolean,
)
const userHistoryByIdSelector = createSelector(
  [userHistoryAsyncSelectors.dataSelector],
  R.propOr({}, USER_HISTORY_BY_ID),
)
export const userHistorySelector = createSelector(
  [userHistoryByIdSelector],
  R.pipe(
    R.values,
    R.sort(
      R.ascend(R.prop('_indexInArray')),
    ),
  ),
)
export const userHistoryPaginationInfoSelector = createSelector(
  [userHistoryAsyncSelectors.dataSelector],
  R.prop('paginationInfo'),
)
export const userHistoryCountSelector = createSelector(
  [userHistoryPaginationInfoSelector],
  R.propOr(0, 'count'),
)
export const userHistoryOffsetSelector = createSelector(
  [userHistoryPaginationInfoSelector],
  R.propOr(0, 'offset'),
)
export const userHistoryHasMoreSelector = createSelector(
  [userHistoryPaginationInfoSelector, isUserHistoryErrorSelector],
  (paginationInfo, userHistoryHasError) => {
    if (userHistoryHasError) {
      return false
    }
    if (!paginationInfo) {
      return true
    }
    return paginationInfo.count > paginationInfo.offset + paginationInfo.limit
  },
)
