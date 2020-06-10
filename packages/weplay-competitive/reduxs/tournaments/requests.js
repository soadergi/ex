import { axios } from 'weplay-core/services/axios'

import { STATUS_CODES } from 'weplay-competitive/constants/statusCodes'

export const validateAccessByLinkToken = (
  token,
  tournamentId,
) => axios.head('/tournament-service/tournaments', {
  params: {
    filter__token: token,
    filter__tournament_id: tournamentId,
  },
}).then(response => response.status === STATUS_CODES.SUCCESS)
