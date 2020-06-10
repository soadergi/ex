import * as R from 'ramda'
import { createSelector } from 'reselect'

import { currentUserSelector, isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { $map } from 'weplay-core/$utils/$map'
import { $find } from 'weplay-core/$utils/$find'

import { teamMembersSelectors } from 'weplay-competitive/reduxs/teamMembers'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { teamsSelectors } from 'weplay-competitive/reduxs/teams'
import { membersSelectors } from 'weplay-competitive/reduxs/members'
import { ROLES } from 'weplay-competitive/constants/roles'
import { TEAM_MEMBERS_COUNT } from 'weplay-competitive/pages/TeamPage/consts'
import { TEAM_MEMBER_STATUSES } from 'weplay-competitive/constants/teamMemberStatuses'

export const createTeamMembersSelector = mapPropsToId => createSelector(
  [
    teamsSelectors.createRecordByIdSelector(mapPropsToId),
    teamMembersSelectors.getRecordByIdSelector,
    membersSelectors.getRecordByIdSelector,
  ],
  (team, getTeamMemberById, getMemberByIdSelector) => R.pipe(
    R.pathOr([], ['relationships', 'teamMembers']),
    relatedTeamMembers => relatedTeamMembers.slice(0, TEAM_MEMBERS_COUNT),
    R.map(R.pipe(
      R.prop('id'),
      getTeamMemberById,
      teamMember => ({
        ...teamMember,
        member: R.pipe(
          R.path(['relationships', 'member', 'id']),
          getMemberByIdSelector,
        )(teamMember),
      }),
    )),
  )(team),
)

export const captainIdSelector = mapPropsToId => createSelector(
  [createTeamMembersSelector(mapPropsToId)],
  R.pipe(
    R.find(R.propEq('role', 'CAPTAIN')),
    R.pathOr({}, ['member', 'id']),
  ),
)

export const isCaptainSelector = mapPropsToId => createSelector(
  [
    captainIdSelector(mapPropsToId),
    currentUserSelector,
    isLoggedInSelector,
  ],
  (captainId, currentUser, isLoggedIn) => isLoggedIn && currentUser.id === captainId,
)

export const createCurrentTeamMemberSelectors = mapPropsToTournamentId => createSelector(
  [
    teamMembersSelectors.getRecordByIdSelector,
    currentMemberSelector,
    tournamentsSelectors.createRecordByIdSelector(mapPropsToTournamentId),
    gameModesSelectors.getRecordByIdSelector,
    teamsSelectors.allRecordsSelector,
    teamMembersSelectors.allRecordsSelector,
  ],
  (getTeamMemberById, currentMember, tournament, getGameModeById, allTeams, allTeamMembers) => {
    const teamMembersIds = R.pipe(
      R.pathOr([], ['relationships', 'teamMembers']),
      R.map(
        R.pipe(
          R.path(['id']),
          getTeamMemberById,
        ),
      ),
      R.filter(R.propEq('status', TEAM_MEMBER_STATUSES.ACTIVE)),
      R.map(R.path(['id'])),
    )(currentMember)
    const gameModeId = R.path(['relationships', 'gameMode', 'id'])(tournament)
    const teamId = R.pipe(
      R.filter(R.pathEq(['relationships', 'gameMode', 'id'], gameModeId)),
      R.find(team => R.intersection(team.relationships.teamMembers.map(R.path(['id'])), teamMembersIds).length),
      R.prop('id'),
    )(allTeams)
    return R.find(
      R.allPass([
        R.pathEq(['relationships', 'team', 'id'], teamId),
        R.pathEq(['relationships', 'member', 'id'], currentMember.id),
        R.propEq('status', TEAM_MEMBER_STATUSES.ACTIVE),
      ]),
    )(allTeamMembers)
  },
)

export const createActiveTeamMembersSelectors = mapPropsToTournamentId => createSelector(
  [
    teamMembersSelectors.allRecordsSelector,
    createCurrentTeamMemberSelectors(mapPropsToTournamentId),
  ],
  (allTeamMembers, currentTeamMember) => R.pipe(
    R.filter(R.propEq('status', 'ACTIVE')),
    R.filter(R.pathEq(['relationships', 'team', 'id'], R.path(['relationships', 'team', 'id'])(currentTeamMember))),
  )(allTeamMembers),
)

export const createCoreTeamMembersSelectors = mapPropsToTournamentId => createSelector(
  [
    createActiveTeamMembersSelectors(mapPropsToTournamentId),
  ],
  R.filter(R.propEq('role', ROLES.CORE)),
)

export const createStandInMembersSelectors = mapPropsToTournamentId => createSelector(
  [
    createActiveTeamMembersSelectors(mapPropsToTournamentId),
    membersSelectors.getRecordByIdSelector,
  ],
  (activeTeamMembers, getMembersById) => R.pipe(
    R.filter(R.propEq('role', ROLES.STAND_IN)),
    R.map(
      R.pipe(
        R.path(['relationships', 'member', 'id']),
        getMembersById,
      ),
    ),
  )(activeTeamMembers),
)

const isEmptySteamInTeamMembers = (teamMembers, getMembersById) => teamMembers
  |> $map(teamMember => getMembersById(teamMember?.relationships?.member?.id))
 |> $find(member => !member?.user?.steamId)
 |> Boolean

export const createIsEmptySteamInTeamMembers = mapPropsToTournamentId => createSelector(
  [
    createActiveTeamMembersSelectors(mapPropsToTournamentId),
    membersSelectors.getRecordByIdSelector,
  ],
  isEmptySteamInTeamMembers,
)
