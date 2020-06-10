import * as R from 'ramda'

import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

export const getOpenDotaRequest = ({ matchId }) => axios.get(
  `https://api.opendota.com/api/matches/${matchId}/`,
)
  .then(R.prop('data')).then(camelizeKeys)
