import * as R from 'ramda'

import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

const EVENT_SERVICE_URL = 'events-service'

export const getTournamentRequest = ({ tournamentId }) => axios.get(`/${EVENT_SERVICE_URL}/tournaments/${tournamentId}`)
  .then(R.prop('data')) // axios
  .then(R.prop('data')) // API convention
  .then(camelizeKeys)
  // .then((tournament) => {
  //   tournament.playoff[0].games[0].whMatchId = 5 // eslint-disable-line no-param-reassign
  //   tournament.playoff[1].games[0].whMatchId = 6 // eslint-disable-line no-param-reassign
  //   return tournament
  // })

export const getTournamentsRequest = params => axios.get(`/${EVENT_SERVICE_URL}/tournaments`, { params })
  .then(R.prop('data')) // axios
  .then(R.prop('data')) // API convention
  .then(camelizeKeys)
