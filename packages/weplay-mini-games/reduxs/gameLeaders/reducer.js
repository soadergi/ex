import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'

import { MINI_GAMES } from '../reducerName'

import {
  getGlobalLeaders,
  getDailyLeaders,
  getMaxResult,
} from './actions'

export const GAME_LEADERS_RN = 'GAME_GLOBAL_LEADERS'
const GET_GLOBAL_LEADERS_RN = 'GET_GLOBAL_LEADERS'

const GET_DAILY_LEADERS_RN = 'GET_DAILY_LEADERS'

const GET_MAX_RESULT_RN = 'GET_MAX_RESULT'

export default combineReducers({
  [GET_GLOBAL_LEADERS_RN]: createRequestReducer(getGlobalLeaders),
  [GET_DAILY_LEADERS_RN]: createRequestReducer(getDailyLeaders),
  [GET_MAX_RESULT_RN]: createRequestReducer(getMaxResult),
})

const gameGlobalLeadersAsyncSelectors = createRequestSelectors([MINI_GAMES, GAME_LEADERS_RN, GET_GLOBAL_LEADERS_RN])
export const isGameGlobalLeadersLoadingSelector = gameGlobalLeadersAsyncSelectors.loadingSelector
export const gameGlobalLeadersPaginationSelector = createSelector(
  [gameGlobalLeadersAsyncSelectors.dataSelector],
  data => data?.meta?.pagination ?? {},
)

const gameMaxResultAsyncSelectors = createRequestSelectors([MINI_GAMES, GAME_LEADERS_RN, GET_MAX_RESULT_RN])
export const gameMaxResultSelector = createSelector(
  [gameMaxResultAsyncSelectors.dataSelector],
  data => data?.score ?? 0,
)

const gameDailyLeadersAsyncSelectors = createRequestSelectors([MINI_GAMES, GAME_LEADERS_RN, GET_DAILY_LEADERS_RN])
export const isGameDailyLeadersLoadingSelector = gameDailyLeadersAsyncSelectors.loadingSelector
export const gameDailyLeadersPaginationSelector = createSelector(
  [gameGlobalLeadersAsyncSelectors.dataSelector],
  data => data?.meta?.pagination ?? {},
)
