import { axios } from 'weplay-core/services/axios'
import config from 'weplay-core/config'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

export const API_URL = `${config.predictionsApi.url}/v1`

export const getLeaderBoardItems = ({ tournamentId, pageLimit, pageOffset }) => axios.get(
  `${API_URL}/leader-boards/${tournamentId}`,
  {
    params: {
      page__limit: pageLimit,
      page__offset: pageOffset,
    },
  },
)
  .then(camelizeKeys)

export const getLeaderBoardItem = ({ tournamentId, participantTwitchId }) => axios.get(
  `${API_URL}/leader-board-participants/${participantTwitchId}`,
  {
    params: {
      filter__tournament_id: tournamentId,
    },
  },
)
  .then(camelizeKeys)
