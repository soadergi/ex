import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'

import { getCharityLeaders } from './actions'

export const CHARITY_GAME_RN = 'CHARITY_GAME_RN'
const GET_LEADERS_RN = 'GET_LEADERS_RN'

const initialState = {
  loading: false,
  data: [],
  meta: null,
  error: null,
}

const requestActionHandler = state => ({
  ...state,
  loading: true,
  error: null,
})

const successActionHandler = (state, { payload }) => ({
  ...state,
  data: [
    ...state.data,
    ...payload.data,
  ],
  meta: payload.meta,
  loading: false,
  error: null,
})

const failActionHandler = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload,
})

export default combineReducers({
  [GET_LEADERS_RN]: handleActions({
    [getCharityLeaders.REQUEST]: requestActionHandler,
    [getCharityLeaders.SUCCESS]: successActionHandler,
    [getCharityLeaders.ERROR]: failActionHandler,
    [getCharityLeaders.CLEAR]: () => ({ ...initialState }),
  }, initialState),
})

export const charityGameLeadersSelector = createRequestSelectors([CHARITY_GAME_RN, GET_LEADERS_RN])
