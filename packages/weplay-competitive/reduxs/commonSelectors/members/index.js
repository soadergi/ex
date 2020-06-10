import { createSelector } from 'reselect'
import * as R from 'ramda'

import { membersSelectors } from 'weplay-competitive/reduxs/members'
import { teamMembersSelectors } from 'weplay-competitive/reduxs/teamMembers'
import { teamsSelectors } from 'weplay-competitive/reduxs/teams'
import { memberGameProfileSelectors } from 'weplay-competitive/reduxs/memberGameProfiles'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { createMemberByIdSelector } from 'weplay-competitive/reduxs/members/selectors'

const isMemberInTeam = member => R.pipe(
  R.prop('teamMembers'),
  R.find(R.propEq('member', member)),
)

export const createMemberGameProfileSelector = (mapPropsToId, mapPropsToGameId) => createSelector(
  [
    createMemberByIdSelector(mapPropsToId),
    memberGameProfileSelectors.getRecordByIdSelector,
    (state, props) => mapPropsToGameId(props),
  ],
  (
    member,
    getMemberGameProfileById,
    gameId,
  ) => R.pipe(
    R.pathOr([], ['relationships', 'memberGameProfiles']),
    R.map(R.prop('id')),
    R.map(getMemberGameProfileById),
    R.find(R.pathEq(['relationships', 'game', 'id'], gameId)),
  )(member),
)

export const createMemberTeamsSelector = mapPropsToId => createSelector(
  [
    membersSelectors.createRecordByIdSelector(mapPropsToId),
    teamMembersSelectors.getRecordByIdSelector,
    teamsSelectors.getRecordByIdSelector,
    membersSelectors.getRecordByIdSelector,
    membersSelectors.allRecordsSelector,
  ],
  (
    member,
    getTeamMemberById,
    getTeamById,
    getMemberById,
  ) => R.pipe(
    R.pathOr([], ['relationships', 'teamMembers']),
    R.map(R.pipe(
      R.prop('id'),
      getTeamMemberById,
      R.path(['relationships', 'team', 'id']),
      getTeamById,
      team => ({
        ...team,
        teamMembers: R.pipe(
          R.pathOr([], ['relationships', 'teamMembers']),
          R.map(R.pipe(
            R.prop('id'),
            getTeamMemberById,
          )),
          R.filter(R.propEq('status', 'ACTIVE')),
          R.map(teamMember => ({
            ...teamMember,
            member: R.pipe(
              R.pathOr([], ['relationships', 'member', 'id']),
              getMemberById,
            )(teamMember),
          })),
        )(team),
      }),
    )),
    R.filter(isMemberInTeam(member)),
  )(member),
)

export const createParticipantInfoSelector = (
  mapPropsToTournamentId,
  mapPropsToTournamentMemberId,
) => createSelector(
  [
    tournamentsSelectors.createRecordByIdSelector(mapPropsToTournamentId),
    tournamentMembersSelectors.createRecordByIdSelector(mapPropsToTournamentMemberId),
    gameModesSelectors.getRecordByIdSelector,
    membersSelectors.getRecordByIdSelector,
    teamsSelectors.getRecordByIdSelector,
  ],
  (
    tournament,
    tournamentMember,
    getGameModeById,
    getMemberById,
    getTeamById,
  ) => {
    const gameMode = R.pipe(
      R.pathOr(NaN, ['relationships', 'gameMode', 'id']),
      getGameModeById,
    )(tournament)

    const member = R.pipe(
      R.pathOr(NaN, ['relationships', 'member', 'id']),
      getMemberById,
    )(tournamentMember)

    const team = R.pipe(
      R.pathOr(NaN, ['relationships', 'team', 'id']),
      getTeamById,
    )(tournamentMember)

    const isTeamTournament = gameMode.size > 1
    return ({
      name: isTeamTournament
        ? R.pathOr('', ['name'], team)
        : R.pathOr('N/A', ['user', 'nickname'], member),
      avatar: isTeamTournament
        ? R.pathOr('', ['avatar'], team)
        : R.pathOr('', ['user', 'avatar'], member),
      id: isTeamTournament
        ? R.propOr(null, 'id', team)
        : R.propOr(null, 'id', member),
      type: isTeamTournament
        ? R.propOr(null, 'type', team)
        : R.propOr(null, 'type', member),
      isPremiumAccount: isTeamTournament
        ? false
        : R.pathOr(false, ['user', 'isPremiumAccount'], member),
    })
  },
)
