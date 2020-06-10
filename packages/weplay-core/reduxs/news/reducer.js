import * as R from 'ramda'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'

import { makeSearch } from 'weplay-core/reduxs/search/actions'

import { createRequestReducer } from '../_factories/request/createRequestReducer'
import { createRequestSelectors } from '../_factories/request/createRequestSelectors'
import { GET_ARTICLES, GET_MORE_ARTICLES } from '../_legacy/articles/actions'
import {
  arrayToMapById,
  camelizeKeys,
  createSuccessDataByEntityId,
} from '../helpers'
import { getSections } from '../sections/actions'
import { getUserHistory } from '../userHistory/actions'
import { addBookmarkByNewsId, deleteBookmarkByNewsId } from '../bookmarks/actions'

import {
  readNews,
  readNewspaper,
} from './actions'

export const NEWS_RN = 'NEWS'
const READ_NEWS_RN = 'READ_NEWS'

const NEWS_BY_ID = 'newsById'

const defaultNewspaper = { tags: [] }

export default combineReducers({
  [READ_NEWS_RN]: createRequestReducer(readNews, {
    [readNews.SUCCESS]: createSuccessDataByEntityId({
      entityName: NEWS_BY_ID,
      pagination: true,
      idKey: 'newsId',
    }),
    [readNewspaper.SUCCESS]: createSuccessDataByEntityId({
      entityName: NEWS_BY_ID,
      idKey: 'newsId',
    }),
    [getSections.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        [NEWS_BY_ID]: {
          ...R.pathOr({}, ['data', NEWS_BY_ID], state),
          ...arrayToMapById(R.propOr([], 'top', payload), 'newsId'),
          ...arrayToMapById(R.propOr([], 'latest', payload), 'newsId'),
          ...arrayToMapById(R.propOr([], 'popular', payload), 'newsId'),
          ...arrayToMapById(R.propOr([], 'editorPicks', payload), 'newsId'),
          ...arrayToMapById(R.filter(R.has('newsId'), R.propOr([], 'topSlider', payload)), 'newsId'),
        },
        paginationInfo: null,
      },
      loading: false,
      error: null,
    }),
    [getUserHistory.SUCCESS]: (state, { payload }) => R.mergeDeepRight({
      data: {
        [NEWS_BY_ID]: arrayToMapById(R.pipe(
          R.propOr([], 'data'),
          R.map(R.prop('news')),
        )(payload), 'newsId'),
      },
    },
    state),
    [makeSearch.SUCCESS]: createSuccessDataByEntityId({
      entityName: NEWS_BY_ID,
      idKey: 'newsId',
    }),
    [deleteBookmarkByNewsId.SUCCESS]: (state, { payload }) => R.assocPath(
      ['data', NEWS_BY_ID, payload.id, 'isInBookmark'],
      false,
      state,
    ),
    [addBookmarkByNewsId.SUCCESS]: (state, { payload }) => R.assocPath(
      ['data', NEWS_BY_ID, payload.news.newsId, 'isInBookmark'],
      true,
      state,
    ),
    // TODO: @Andrew: remove GET_ARTICLES when we will used readNews everywhere
    [GET_ARTICLES.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        [NEWS_BY_ID]: {
          ...R.pathOr({}, ['data', NEWS_BY_ID], state),
          ...arrayToMapById(R.pipe(
            R.pathOr([], ['data', 'data']),
            camelizeKeys,
          )(payload), 'newsId'),
        },
      },
    }),
    // TODO: @Andrew: remove GET__MORE_ARTICLES when we will used readNews everywhere
    [GET_MORE_ARTICLES.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        [NEWS_BY_ID]: {
          ...R.pathOr({}, ['data', NEWS_BY_ID], state),
          ...arrayToMapById(R.pipe(
            R.pathOr([], ['data', 'data']),
            camelizeKeys,
          )(payload), 'newsId'),
        },
      },
    }),
  }),
})

const readNewsAsyncSelectors = createRequestSelectors([NEWS_RN, READ_NEWS_RN])
const readNewsDataSelector = readNewsAsyncSelectors.dataSelector

export const isReadNewsLoadingSelector = readNewsAsyncSelectors.loadingSelector
export const isReadNewsErrorSelector = createSelector(
  [readNewsAsyncSelectors.errorSelector],
  R.pipe(
    R.isNil,
    R.not,
  ),
)

const readNewsPaginationInfoSelector = createSelector(
  [readNewsAsyncSelectors.dataSelector],
  R.prop('paginationInfo'),
)
const readNewsOffsetSelector = createSelector(
  [readNewsPaginationInfoSelector],
  R.propOr(0, 'offset'),
)
const readNewsLimitSelector = createSelector(
  [readNewsPaginationInfoSelector],
  R.propOr(0, 'limit'),
)
export const readNewsPageNumSelector = createSelector(
  [readNewsOffsetSelector, readNewsLimitSelector],
  R.pipe(
    R.divide,
    R.inc,
    R.defaultTo(1),
  ),
)
export const readNewsHasMoreSelector = createSelector(
  [readNewsPaginationInfoSelector, isReadNewsErrorSelector],
  (paginationInfo, hasError) => {
    if (hasError) {
      return false
    }
    if (!paginationInfo) {
      return true
    }
    return paginationInfo.count > paginationInfo.offset + paginationInfo.limit
  },
)

export const newsByIdSelector = createSelector(
  [readNewsDataSelector],
  R.propOr({}, NEWS_BY_ID),
)

export const newsIdsSelector = createSelector(
  [newsByIdSelector],
  R.keys,
)
const allNewsSelector = createSelector(
  [newsByIdSelector],
  R.values,
)
export const createNewspapersByArticleIdSelector = mapPropsToArticleId => createSelector(
  [(state, props) => mapPropsToArticleId(props), allNewsSelector],
  (articleId, allNews) => allNews.filter(R.propEq('articleId', articleId)),
)

// TODO use createNewspapersByIdsSelector instead of this selector
export const createNewsByIdSelector = mapPropsToId => createSelector(
  [newsByIdSelector, (state, props) => mapPropsToId(props)],
  (newsData, newsIds) => R.pipe(
    R.map(id => R.prop(id)(newsData)),
    R.filter(R.complement(R.isNil)),
  )(newsIds),
)
export const createNewspaperByIdSelector = mapPropsToId => createSelector(
  [(state, props) => mapPropsToId(props), newsByIdSelector],
  R.propOr({}),
)
export const createNewspapersByTagIdSelector = (tagId, locale) => createSelector(
  [allNewsSelector],
  newspapers => newspapers
    .filter(newspaper => newspaper.language === locale
      && newspaper.tags.some(tag => tag.tagId === tagId))
    .sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1)),
)
export const createNewspapersByIdsSelector = newsIds => createSelector(
  [newsByIdSelector],
  news => newsIds.map(newsId => news[newsId]),
)

export const createNewspaperByIdsSelector = newsId => createSelector(
  [newsByIdSelector],
  news => news[newsId] ?? defaultNewspaper,
)
export const createColumnistLastArticleSelector = columnistId => createSelector(
  [allNewsSelector],
  newspapers => newspapers.filter(newspaper => newspaper.columnist?.authorId === columnistId)
    .sort((newspaper1, newspaper2) => (newspaper1.publishedDate > newspaper2.publishedDate ? 1 : -1))[0],
)

export const lastNNewsSelector = n => createSelector(
  [allNewsSelector],
  news => news.sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1)).slice(0, n),
)
