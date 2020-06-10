import * as R from 'ramda'

import { camelizeKeys } from 'weplay-core/reduxs/helpers'
import { axios } from 'weplay-core/services/axios'

const BOOKMARKS_URL = '/media-service/bookmarks'
const BOOKMARKS_NEWS_URL = '/media-service/news'

export const getBookmarksRequest = params => axios
  .get(`${BOOKMARKS_URL}`, { params })
  .then(R.prop('data'))
  .then(camelizeKeys)

export const deleteBookmarkByIdRequest = id => axios
  .delete(`${BOOKMARKS_URL}/${id}`)
  .then(() => ({ id }))

export const deleteUserBookmarksRequest = params => axios
  .delete(`${BOOKMARKS_URL}`, { params })

export const deleteBookmarkByNewsIdRequest = id => axios
  .post(`${BOOKMARKS_NEWS_URL}/${id}/delete-from-bookmarks`)
  .then(() => ({ id }))

export const addBookmarkByNewsIdRequest = id => axios
  .post(`${BOOKMARKS_NEWS_URL}/${id}/add-to-bookmarks`)
  .then(R.prop('data'))
  .then(camelizeKeys)
