import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

export const getMemberStatisticRequest = ({ discipline, steamId }) => axios.get(
  `tournament-service/statistic/players/${discipline}/${steamId}`,
)
  .catch(error => console.error(`Error in get player statistic: ${error}`))
  .then(camelizeKeys)

export const getTeamStatisticRequest = ({ discipline, teamName }) => axios.get(
  `tournament-service/statistic/teams/${discipline}/${teamName}/`,
)
  .catch(error => console.error(`Error in get team statistic: ${error}`))
  .then(camelizeKeys)

export const getMatchStatisticRequest = matchId => axios.get(
  `/tournament-service/statistic/matches/${matchId}`,
)
  .catch(error => console.error(`Error in get match statistic: ${error}`))
  .then(camelizeKeys)
