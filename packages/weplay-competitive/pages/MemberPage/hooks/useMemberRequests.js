
import { useSelector } from 'react-redux'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'

import { membersActions } from 'weplay-competitive/reduxs/members'
import { teamMembersActions } from 'weplay-competitive/reduxs/teamMembers'
import { TEAM_MEMBER_STATUSES } from 'weplay-competitive/constants/teamMemberStatuses'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import { matchMembersActions } from 'weplay-competitive/reduxs/matchMembers'
import { getMemberStatistic } from 'weplay-competitive/reduxs/statistic/actions'
import { MAX_MATCHES } from 'weplay-competitive/pages/MemberPage/consts'
import { createMemberSteamIdSelector } from 'weplay-competitive/reduxs/members/selectors'

export const useMemberRequests = () => {
  const { memberId, discipline } = useParams()

  const steamId = useSelector(createMemberSteamIdSelector(memberId))

  const findMemberRequest = membersActions.findRecord.request({
    id: memberId,
    included: 'member_game_profiles',
  })

  const queryTeamMembersRequest = teamMembersActions.queryRecords.request({
    included: 'team',
    'filter[status]': `${TEAM_MEMBER_STATUSES.ACTIVE},${TEAM_MEMBER_STATUSES.BANNED}`,
    'filter[member.id]': memberId,
    'filter[team.game]': DISCIPLINES[discipline].id,
  })

  const queryMatchMembersRequest = matchMembersActions.queryRecords.request({
    included: 'match,tournament_member',
    'filter[tournament_member.member]': memberId,
    'filter[match.game]': DISCIPLINES[discipline].id,
    'page[limit]': MAX_MATCHES,
  })

  const getMemberStatisticRequest = getMemberStatistic.request({
    discipline: DISCIPLINES[discipline].statistic.name,
    steamId,
  })

  return {
    findMemberRequest,
    queryTeamMembersRequest,
    queryMatchMembersRequest,
    getMemberStatisticRequest,
  }
}
