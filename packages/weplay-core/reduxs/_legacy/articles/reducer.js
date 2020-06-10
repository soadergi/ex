import * as R from 'ramda'
import { createSelector } from 'reselect'

import {
  GET_ARTICLES,
  GET_MORE_ARTICLES,
} from './actions'
import ArticlesCollection from './model'

const removeDuplicates = (propArr, prop) => propArr.filter(
  (obj, pos, arr) => arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos,
)

const initialState = {
  collection: new ArticlesCollection([]),
  loading: true,
  count: 0,
  isError: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES.REQUEST:
      return ({
        ...state,
        initialState,
      })
    case GET_ARTICLES.SUCCESS:
      return ({
        ...state,
        collection: new ArticlesCollection(action.payload.data.data),
        loading: false,
        count: action.payload.data.pagination_info.count,
        isError: false,
      })
    case GET_MORE_ARTICLES.SUCCESS: {
      const moreArticles = new ArticlesCollection(action.payload.data.data)
      return ({
        ...state,
        collection: {
          all: state.collection.all.concat(moreArticles.all),
        },
        loading: false,
        count: Math.max(state.count, action.payload.data.pagination_info.count),
        isError: false,
      })
    }
    default: {
      return state
    }
  }
}

export const ARTICLES_OLD_RN = 'Articles'
const articleRootSelector = R.prop(ARTICLES_OLD_RN)

export const articlesCollectionSelector = createSelector(
  [articleRootSelector],
  R.prop('collection'),
)

export const articlesSelector = createSelector(
  [articleRootSelector],
  Articles => removeDuplicates(Articles.collection.all, 'newsId'),
)

export const articlesFirstNSelector = n => createSelector(
  articlesSelector,
  articles => articles.slice(0, n),
)
