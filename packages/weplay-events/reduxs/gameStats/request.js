import * as R from 'ramda'

import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

const API_KEY = 'eewIAGiq23f239tb3u0A3TAWHasf5o5f37'

export const getGameStatsRequest = ({ matchId }) => axios.get(
  `/warehouse-service/matches/${matchId}/`, {
    headers: { 'Api-Key': API_KEY },
  },
)
  .then(R.prop('data')).then(camelizeKeys)
  .catch(err => console.error(err))

export const getVotingStatsRequest = id => axios.get(
  `/warehouse-service/dota2/prematch_stats/${id}/`, {
    headers: { 'Api-Key': API_KEY },
  },
)
  .then(R.prop('data')).then(R.prop('data'))
  .catch(err => console.error(err))
