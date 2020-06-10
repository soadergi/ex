import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import {
  getGameGlobalLeadersRequest,
  getGameMaxResultRequest,
  getGameDailyLeadersRequest,
} from './requests'

const GET_GAME_GLOBAL_LEADERS = 'GET_GAME_GLOBAL_LEADERS'
const GET_GAME_DAILY_LEADERS = 'GET_GAME_GLOBAL_LEADERS'

const GET_GAME_RESULTS = 'GET_GAME_RESULTS'

export const getGlobalLeaders = createRequestActions(GET_GAME_GLOBAL_LEADERS, getGameGlobalLeadersRequest)
export const getDailyLeaders = createRequestActions(GET_GAME_DAILY_LEADERS, getGameDailyLeadersRequest)
export const getMaxResult = createRequestActions(GET_GAME_RESULTS, getGameMaxResultRequest)
