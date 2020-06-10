import { NAMES } from 'weplay-core/routes'

import { teamMembersActions } from 'weplay-competitive/reduxs/teamMembers'
import { tournamentsActions } from 'weplay-competitive/reduxs/tournaments'
import { TEAM_MEMBER_STATUSES } from 'weplay-competitive/constants/teamMemberStatuses'
import { teamsActions } from 'weplay-competitive/reduxs/teams'
import { MAX_TOURNAMENTS, TEAM_MEMBERS_COUNT } from 'weplay-competitive/pages/TeamPage/consts'
import { TOURNAMENT_MEMBER_STATUSES } from 'weplay-competitive/constants/tournamentMemberStatuses'
import { STATUS_CODES } from 'weplay-competitive/constants/statusCodes'

// TODO: @frontend add global function for catching 404 error
const handleNotFoundError = (error, history) => {
  if (error?.error?.status === STATUS_CODES.NOT_FOUND) {
    history.replace(`/${NAMES.NOT_FOUND}`)
  }
  return Promise.reject(error)
}
export const queryTeamAllInfo = (teamId, history) => (
  dispatch,
  getState,
) => {
  const teamMembersRequest = teamMembersActions.queryRecords.request({
    included: 'member,team',
    'filter[status]': `${TEAM_MEMBER_STATUSES.ACTIVE},${TEAM_MEMBER_STATUSES.BANNED}`,
    'filter[team.id]': teamId,
    'page[limit]': TEAM_MEMBERS_COUNT,
  })(dispatch, getState)
    .catch(error => handleNotFoundError(error, history))
    // TODO: Show team statistic
  const tournamentsRequest = tournamentsActions.queryRecords.request({
    included: 'tournament_members,organizer,game_mode',
    'filter[tournament_members.team]': teamId,
    'filter[tournament_members.status]': `${TOURNAMENT_MEMBER_STATUSES.ACTIVE},${TOURNAMENT_MEMBER_STATUSES.BANNED}`,
    'page[limit]': MAX_TOURNAMENTS,
  })(dispatch, getState)
  const teamRequest = teamsActions.findRecord.request({
    id: teamId,
    included: 'game_mode',
  })(dispatch, getState)
    .catch(error => handleNotFoundError(error, history))
  return Promise.all([teamMembersRequest, tournamentsRequest, teamRequest])
}
