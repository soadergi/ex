import { useParams } from 'weplay-singleton/RouterProvider/useParams'

import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import { MAX_TOURNAMENTS } from 'weplay-competitive/pages/MemberPage/consts'
import { tournamentsActions } from 'weplay-competitive/reduxs/tournaments'
import { TOURNAMENT_MEMBER_STATUSES } from 'weplay-competitive/constants/tournamentMemberStatuses'

export const useTournamentRequests = () => {
  const { memberId, discipline } = useParams()

  const tournamentMemberStatuses = `${TOURNAMENT_MEMBER_STATUSES.ACTIVE},${TOURNAMENT_MEMBER_STATUSES.BANNED}`

  const queryTournamentsRequest = tournamentsActions.queryRecords.request({
    included: 'stages',
    'filter[tournament_members.member]': memberId,
    'filter[tournament_members.status]': tournamentMemberStatuses,
    'filter[game]': DISCIPLINES[discipline].id,
    'page[limit]': MAX_TOURNAMENTS,
  })

  const queryTournamentsFromMatchRequest = tournamentFromMatchIds => tournamentsActions.queryRecords.request({
    'filter[published]': 1,
    'filter[id]': tournamentFromMatchIds.join(','),
    'page[limit]': tournamentFromMatchIds.length,
  })

  return {
    queryTournamentsRequest,
    queryTournamentsFromMatchRequest,
  }
}
