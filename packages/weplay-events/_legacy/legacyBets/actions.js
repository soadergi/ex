// TODO: DANGER. LEGACY CODE. It doesn't work, not connected with redux and there're no any usages of it.
// Decided to keep it here in case of come back of some previous betting companies.
import createAction from 'redux-actions/es/createAction'

import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import {
  getOfflineBetsRequest, getOnlineBetsRequest, getEsBetsRequest, getEGBBetsRequest, getLootBetRequest,
} from './requests'

const GET_OFFLINE_BETS = 'GET_OFFLINE_BETS'
export const getOfflineBets = createRequestActions(GET_OFFLINE_BETS, getOfflineBetsRequest)

const GET_ONLINE_BETS = 'GET_ONLINE_BETS'
export const getOnlineBets = createRequestActions(GET_ONLINE_BETS, getOnlineBetsRequest)

const GET_ES_BETS = 'GET_ES_BETS'
export const getEsBets = createRequestActions(GET_ES_BETS, getEsBetsRequest)

const GET_EGB_BETS = 'GET_EGB_BETS'
export const getEGBBets = createRequestActions(GET_EGB_BETS, getEGBBetsRequest)

export const getLootBetsAction = createAction('GET_LOOT_BETS')
export const getLootBets = () => (dispatch) => {
  getLootBetRequest()
    .then(matchesBets => dispatch(getLootBetsAction(matchesBets)))
}
