import { combineReducers } from 'redux'

import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'

import { GET_PARIMATCH_BETS, getParimatchBets } from './actions'

export const BETS_RN = 'BETS'

export const betsReducer = combineReducers({
  [GET_PARIMATCH_BETS]: createRequestReducer(getParimatchBets),
})
