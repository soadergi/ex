import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { getParimatchBetsRequest } from './requests'

export const GET_PARIMATCH_BETS = 'GET_PARIMATCH_BETS'
export const getParimatchBets = createRequestActions(GET_PARIMATCH_BETS, getParimatchBetsRequest)
