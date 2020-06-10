import * as R from 'ramda'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'
import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'

import { getGameStatistic } from './actions'

export const GAME_STATS_RN = 'GAME_STATS'
const GET_GAME_STATS = 'GET_GAME_STATS'
const EVENTS_RN = 'EVENTS'

export default combineReducers({
  [GET_GAME_STATS]: createRequestReducer(getGameStatistic),
})

const getMatchSelector = createRequestSelectors([EVENTS_RN, GAME_STATS_RN, GET_GAME_STATS])
export const areMatchesLoadingSelector = getMatchSelector.loadingSelector
export const matchSelector = createSelector(
  [getMatchSelector.dataSelector],
  R.defaultTo({}),
)
