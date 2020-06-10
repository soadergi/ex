import { membersActions } from 'weplay-competitive/reduxs/members'
import { teamsActions } from 'weplay-competitive/reduxs/teams'
import { tournamentsActions, tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/gameModeTypes'
import { TOURNAMENT_MEMBER_STATUSES } from 'weplay-competitive/constants/tournamentMemberStatuses'

export const queryParticipantsAllInfo = (tournamentId, history, pagination, prevPagination) => (
  dispatch,
  getState,
) => tournamentsActions.findRecord.request({
  id: tournamentId,
  included: 'game_mode',
})(dispatch, getState)
  .then(() => {
    const state = getState()
    const getTournamentById = tournamentsSelectors.getRecordByIdSelector(state)
    const getGameModeById = gameModesSelectors.getRecordByIdSelector(state)

    const tournament = getTournamentById(tournamentId)
    const gameModeId = tournament.relationships.gameMode.id
    const gameMode = getGameModeById(gameModeId)

    if (gameMode.gameModeType === GAME_MODE_TYPES.TEAM) {
      const queryTeamRequest = teamsActions.queryRecords.request({
        included: 'tournament_members',
        'filter[tournament_members.tournament]': tournamentId,
        'filter[tournament_members.status]': TOURNAMENT_MEMBER_STATUSES.ACTIVE,
        'page[offset]': pagination.offset,
        'page[limit]': pagination.limit || prevPagination.limit,
      })
      return queryTeamRequest(dispatch, getState)
    }
    const queryMemberRequest = membersActions.queryRecords.request({
      included: 'tournament_members',
      'filter[tournament_members.tournament]': tournamentId,
      'filter[tournament_members.status]': TOURNAMENT_MEMBER_STATUSES.ACTIVE,
      'page[offset]': pagination.offset,
      'page[limit]': pagination.limit || prevPagination.limit,
    })
    return queryMemberRequest(dispatch, getState)
  })
