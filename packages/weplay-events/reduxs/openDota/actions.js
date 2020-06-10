import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { getOpenDotaRequest } from './request'

const GET_OPEN_DOTA_STATISTIC = 'GET_OPEN_DOTA_STATISTIC'

export const getOpenDotaStatistic = createRequestActions(GET_OPEN_DOTA_STATISTIC, getOpenDotaRequest)
