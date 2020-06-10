import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { getGameStatsRequest } from './request'

const GET_GAME_STATISTIC = 'GET_GAME_STATISTIC'

export const getGameStatistic = createRequestActions(GET_GAME_STATISTIC, getGameStatsRequest)
