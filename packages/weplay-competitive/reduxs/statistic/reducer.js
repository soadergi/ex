import * as R from 'ramda'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'

import { floatFormatValue } from 'weplay-competitive/utils/floatFormatValue'
import { defaultStatistic } from 'weplay-competitive/constants/statistic/general'
import {
  getMemberStatistic,
  getTeamStatistic,
  getMatchStatistic,
} from 'weplay-competitive/reduxs/statistic/actions'

export const COMPETITIVE_RN = 'COMPETITIVE'
export const STATISTIC_RN = 'STATISTIC'
export const MEMBER_STATISTIC_RN = 'MEMBER_STATISTIC_RN'
export const TEAM_STATISTIC_RN = 'TEAM_STATISTIC_RN'
export const MATCH_STATISTIC_RN = 'MATCH_STATISTIC_RN'

const defaultMatchStatistic = {
  mapsStats: [],
}

export default combineReducers({
  [MEMBER_STATISTIC_RN]: createRequestReducer(getMemberStatistic),
  [TEAM_STATISTIC_RN]: createRequestReducer(getTeamStatistic),
  [MATCH_STATISTIC_RN]: createRequestReducer(getMatchStatistic),
})

const getMemberStatisticSelectors = createRequestSelectors([
  COMPETITIVE_RN,
  STATISTIC_RN,
  MEMBER_STATISTIC_RN,
])

const getTeamStatisticSelectors = createRequestSelectors([
  COMPETITIVE_RN,
  STATISTIC_RN,
  TEAM_STATISTIC_RN,
])

const getMatchStatisticSelectors = createRequestSelectors([
  COMPETITIVE_RN,
  STATISTIC_RN,
  MATCH_STATISTIC_RN,
])

const formatValue = (value, key) => {
  if (key === 'avgDuration') {
    return value.replace(/(\.)\w+/, '')
  }
  return floatFormatValue(value)
}

export const memberStatisticSelector = createSelector(
  [getMemberStatisticSelectors.dataSelector],
  response => (R.isEmpty(R.propOr('', 'data')(response))
    ? defaultStatistic
    : R.mapObjIndexed(formatValue, response.data)
  ),
)

export const teamStatisticSelector = createSelector(
  [getTeamStatisticSelectors.dataSelector],
  response => (R.isEmpty(R.propOr('', 'data')(response))
    ? defaultStatistic
    : R.mapObjIndexed(formatValue, response.data)
  ),
)

export const matchStatisticSelector = createSelector(
  [getMatchStatisticSelectors.dataSelector],
  response => (R.isEmpty(R.propOr('', 'data')(response))
    ? defaultMatchStatistic
    : R.mapObjIndexed(formatValue, response.data)
  ),
)
