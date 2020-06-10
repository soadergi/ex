import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'

import { MEDIA } from '../reducerName'

import {
  getCategory,
} from './actions'

export const CATEGORIES_RN = 'CATEGORIES'
export const GET_CATEGORY_RN = 'GET_CATEGORY'

export default combineReducers({
  [GET_CATEGORY_RN]: createRequestReducer(getCategory),
})

const categoriesAsyncSelectorsSelector = createRequestSelectors([MEDIA, CATEGORIES_RN, GET_CATEGORY_RN])

export const categorySelector = createSelector(
  categoriesAsyncSelectorsSelector.dataSelector,
  category => category ?? {},
)
