import * as R from 'ramda'

import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

export const getChallongeRequest = ({ params }) => axios.get(
  'tournament-service/challonge',
  { params },
)
  .then(resp => R.pipe(
    R.values,
    R.map(R.pipe(
      R.prop('tournament'),
      R.pick([
        'id',
        'full_challonge_url',
        'name',
        'state',
        'start_at',
        'started_at',
        'tournament_type',
        'participants_count',
      ]),
    )),
    camelizeKeys,
  )(resp.data))
