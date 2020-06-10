import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import {
  getMemberStatisticRequest,
  getTeamStatisticRequest,
  getMatchStatisticRequest,
} from 'weplay-competitive/reduxs/statistic/requests'

const MEMBER_STATISTIC = 'MEMBER_STATISTIC'
export const getMemberStatistic = createRequestActions(MEMBER_STATISTIC, getMemberStatisticRequest)

const TEAM_STATISTIC = 'TEAM_STATISTIC'
export const getTeamStatistic = createRequestActions(TEAM_STATISTIC, getTeamStatisticRequest)

const MATCH_STATISTIC = 'MATCH_STATISTIC'
export const getMatchStatistic = createRequestActions(MATCH_STATISTIC, getMatchStatisticRequest)
