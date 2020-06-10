import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import {
  getBookmarksRequest,
  deleteBookmarkByIdRequest,
  deleteUserBookmarksRequest,
  addBookmarkByNewsIdRequest,
  deleteBookmarkByNewsIdRequest,
} from './requests'

const GET_BOOKMARKS = 'GET_BOOKMARKS'
const DELETE_BOOKMARK_BY_ID = 'DELETE_USER_BOOKMARK_BY_ID'
const DELETE_BOOKMARKS = 'DELETE_BOOKMARKS'
const DELETE_BOOKMARK_BY_NEWS_ID = 'DELETE_BOOKMARK_BY_NEWS_ID'
const ADD_BOOKMARKS_BY_NEWS_ID = 'ADD_BOOKMARKS_BY_NEWS_ID'

export const getBookmarks = createRequestActions(GET_BOOKMARKS, getBookmarksRequest)

export const deleteBookmarkById = createRequestActions(DELETE_BOOKMARK_BY_ID, deleteBookmarkByIdRequest)

export const deleteBookmarks = createRequestActions(DELETE_BOOKMARKS, deleteUserBookmarksRequest)

export const deleteBookmarkByNewsId = createRequestActions(
  DELETE_BOOKMARK_BY_NEWS_ID,
  deleteBookmarkByNewsIdRequest,
)
export const addBookmarkByNewsId = createRequestActions(ADD_BOOKMARKS_BY_NEWS_ID, addBookmarkByNewsIdRequest)
