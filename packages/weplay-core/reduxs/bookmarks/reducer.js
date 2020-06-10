import * as R from 'ramda'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'
import { arrayToMapById } from 'weplay-core/reduxs/helpers'

import {
  getBookmarks,
  deleteBookmarkById,
  addBookmarkByNewsId,
  deleteBookmarkByNewsId,
  deleteBookmarks,
} from './actions'

export const BOOKMARKS_RN = 'BOOKMARKS'
export const GET_BOOKMARKS_RN = 'GET_BOOKMARKS'
const DELETE_BOOKMARKS_BY_ID_RN = 'DELETE_BOOKMARKS_BY_ID'
const DELETE_BOOKMARKS_RN = 'DELETE_BOOKMARKS'
const ADD_BOOKMARK_RN = 'ADD_BOOKMARK'

const BOOKMARKS_BY_ID = 'bookmarksById'

export default combineReducers({
  [GET_BOOKMARKS_RN]: createRequestReducer(getBookmarks, {
    [getBookmarks.SUCCESS]: (state, { payload }) => ({
      data: {
        ...state.data,
        [BOOKMARKS_BY_ID]:
          (payload.paginationInfo.offset === 0
            ? arrayToMapById(payload.data)
            : {
              ...state.data[BOOKMARKS_BY_ID],
              ...arrayToMapById(payload.data, 'id', payload.paginationInfo.offset),
            }),
        paginationInfo: payload.paginationInfo,
      },
      loading: false,
      error: null,
    }),
    [deleteBookmarkById.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        [BOOKMARKS_BY_ID]: R.omit([payload.id], state.data[BOOKMARKS_BY_ID]),
        paginationInfo: {
          offset: R.dec(state.data.paginationInfo.offset),
          count: R.dec(state.data.paginationInfo.count),
        },
      },
    }),
    [deleteBookmarks.SUCCESS]: state => ({
      ...state,
      data: {
        ...state.data,
        [BOOKMARKS_BY_ID]: {},
      },
    }),
    [addBookmarkByNewsId.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        [BOOKMARKS_BY_ID]: R.mergeDeepRight(
          R.pathOr({}, ['data', BOOKMARKS_BY_ID], state),
          { [payload.id]: payload },
        ),
      },
    }),
  }),
  [ADD_BOOKMARK_RN]: createRequestReducer(addBookmarkByNewsId, {
    [addBookmarkByNewsId.SUCCESS]: R.always(null),
  }),
  [DELETE_BOOKMARKS_BY_ID_RN]: createRequestReducer(deleteBookmarkByNewsId, {
    [deleteBookmarkByNewsId.SUCCESS]: R.always(null),
  }), // TODO add to reducer on delete when api ready,
  [DELETE_BOOKMARKS_RN]: createRequestReducer(deleteBookmarks, {
    [deleteBookmarkById.SUCCESS]: state => ({
      ...state,
      data: true,
    }),
  }),
})

const addBookmarkByNewsIdAsyncSelectors = createRequestSelectors([BOOKMARKS_RN, ADD_BOOKMARK_RN])
const deleteBookmarkByNewsIdAsyncSelectors = createRequestSelectors([BOOKMARKS_RN, DELETE_BOOKMARKS_BY_ID_RN])
const deleteBookmarksAsyncSelectors = createRequestSelectors(([BOOKMARKS_RN, DELETE_BOOKMARKS_RN]))

export const isAddBookmarkByNewsIdLoadingSelector = addBookmarkByNewsIdAsyncSelectors.loadingSelector
export const isDeleteBookmarkByNewsIdLoadingSelector = deleteBookmarkByNewsIdAsyncSelectors.loadingSelector

const getBookmarksAsyncSelectors = createRequestSelectors([BOOKMARKS_RN, GET_BOOKMARKS_RN])
const getBookmarksDataSelector = getBookmarksAsyncSelectors.dataSelector
const getBookmarksErrorSelector = getBookmarksAsyncSelectors.errorSelector
export const isBookmarksLoadingSelector = getBookmarksAsyncSelectors.loadingSelector

export const isDeletedBookmarksSelector = createSelector(
  [deleteBookmarksAsyncSelectors.dataSelector],
  Boolean,
)
export const bookmarksPaginationInfoSelector = createSelector(
  [getBookmarksDataSelector],
  R.prop('paginationInfo'),
)
export const bookmarksCountSelector = createSelector(
  [bookmarksPaginationInfoSelector],
  R.propOr(0, 'count'),
)

export const bookmarksSelector = createSelector(
  [getBookmarksDataSelector],
  R.pipe(
    R.propOr({}, BOOKMARKS_BY_ID),
    R.values,
    R.sort(
      R.ascend(R.prop('_indexInArray')),
    ),
  ),
)

export const bookmarksHasMoreSelector = createSelector(
  [bookmarksPaginationInfoSelector, getBookmarksErrorSelector],
  (paginationInfo, userBookmarksHasError) => {
    if (userBookmarksHasError || !paginationInfo) {
      return false
    }
    return paginationInfo.count > paginationInfo.offset + paginationInfo.limit
  },
)
