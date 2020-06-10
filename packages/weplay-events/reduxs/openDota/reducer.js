import * as R from 'ramda'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'
import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'

import { getOpenDotaStatistic } from './actions'

export const OPEN_DOTA_STATS_RN = 'OPEN_DOTA_STATS'
const GET_OPEN_DOTA_STATS = 'GET_OPEN_DOTA_STATS'
const EVENTS_RN = 'EVENTS'

export default combineReducers({
  [GET_OPEN_DOTA_STATS]: createRequestReducer(getOpenDotaStatistic),
})

const getMatchSelector = createRequestSelectors([EVENTS_RN, OPEN_DOTA_STATS_RN, GET_OPEN_DOTA_STATS])

export const openDotaMatchSelector = createSelector(
  [getMatchSelector.dataSelector],
  R.defaultTo({}),
)

export const isRadiantWinnerSelector = createSelector(
  [openDotaMatchSelector],
  R.prop('radiantWin'),
)
