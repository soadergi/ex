import * as R from 'ramda'
import { createSelector } from 'reselect'

import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'
import { membersSelectors } from 'weplay-competitive/reduxs/members'
import { teamsSelectors } from 'weplay-competitive/reduxs/teams'
import { createTournamentGameModeSelector } from 'weplay-competitive/reduxs/commonSelectors/gameModes'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/gameModeTypes'
import { TOURNAMENT_MEMBER_STATUSES } from 'weplay-competitive/constants/tournamentMemberStatuses'

export const createTournamentMemberIdsSelector = mapPropsToTournamentId => createSelector(
  [
    tournamentsSelectors.createRecordByIdSelector(mapPropsToTournamentId),
    tournamentMembersSelectors.getRecordByIdSelector,
    createTournamentGameModeSelector(mapPropsToTournamentId),
  ],
  (tournament, getTournamentMemberById, gameMode) => R.pipe(
    R.pathOr([], ['relationships', 'tournamentMembers']),
    R.map(R.pipe(
      R.prop('id'),
      getTournamentMemberById,
      (tournamentMember) => {
        switch (gameMode.gameModeType) {
          case GAME_MODE_TYPES.TEAM:
            return R.path(['relationships', 'team', 'id'], tournamentMember)
          case GAME_MODE_TYPES.SINGLE:
            return R.path(['relationships', 'member', 'id'], tournamentMember)
          default:
            return NaN
        }
      },
    )),
    tournamentMembers => (gameMode.gameModeType === GAME_MODE_TYPES.TEAM
      ? R.uniq(tournamentMembers)
      : tournamentMembers),
  )(tournament),
)

export const createTournamentParticipantsSelector = mapPropsToTournamentId => createSelector(
  [
    membersSelectors.getRecordByIdSelector,
    teamsSelectors.getRecordByIdSelector,
    createTournamentGameModeSelector(mapPropsToTournamentId),
    tournamentMembersSelectors.allRecordsSelector,
    tournamentsSelectors.createRecordByIdSelector(mapPropsToTournamentId),
  ],
  (
    getMemberById,
    getTeamById,
    gameMode,
    allTournamentMembers,
    tournament,
  ) => R.pipe(
    R.filter(
      R.allPass([
        R.pathEq(['relationships', 'tournament', 'id'], R.prop('id', tournament)),
        R.propEq('status', TOURNAMENT_MEMBER_STATUSES.ACTIVE),
      ]),
    ),
    R.map(tournamentMember => (gameMode.gameModeType === GAME_MODE_TYPES.TEAM
      ? getTeamById(tournamentMember.relationships.team.id)
      : getMemberById(tournamentMember.relationships.member.id))),
    tournamentParticipants => (gameMode.gameModeType === GAME_MODE_TYPES.TEAM
      ? R.uniq(tournamentParticipants) : tournamentParticipants),
  )(allTournamentMembers),
)

export const createParticipantsNamesSelector = mapPropsToTournamentId => createSelector(
  [
    createTournamentParticipantsSelector(mapPropsToTournamentId),
  ],
  R.map(R.path(['user', 'nickname'])),
)
