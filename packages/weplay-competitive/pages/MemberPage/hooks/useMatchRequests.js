import { useParams } from 'weplay-singleton/RouterProvider/useParams'

import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import { matchesActions } from 'weplay-competitive/reduxs/matches'
import { voteItemsActions } from 'weplay-competitive/reduxs/voteItems'
import { gamesActions } from 'weplay-competitive/reduxs/games'

export const useMatchRequests = () => {
  const { discipline } = useParams()

  const queryMatchesRequest = lobbiesIds => matchesActions.queryRecords.request({
    included: 'node,members,lobby',
    'filter[lobby.id]': lobbiesIds.join(','),
    'page[limit]': lobbiesIds.length,
  })

  const queryVoteItemsRequest = votePoolIds => voteItemsActions.queryRecords.request({
    'filter[id]': votePoolIds.join(','),
    'page[limit]': votePoolIds.length,
  })

  const queryGameRequest = gamesActions.findRecord.request({
    id: DISCIPLINES[discipline].id,
    included: 'game_modes',
  })

  return {
    queryMatchesRequest,
    queryVoteItemsRequest,
    queryGameRequest,
  }
}
