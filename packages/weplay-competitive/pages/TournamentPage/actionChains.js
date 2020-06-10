import * as R from 'ramda'

import { voteItemsActions } from 'weplay-competitive/reduxs/voteItems'
import { tournamentsActions, tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { membersActions } from 'weplay-competitive/reduxs/members'
import { teamsActions } from 'weplay-competitive/reduxs/teams'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { gamesActions } from 'weplay-competitive/reduxs/games'
import { rewardsActions } from 'weplay-competitive/reduxs/rewards'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/gameModeTypes'
import { TEAM_STATUSES } from 'weplay-competitive/constants/teamStatuses'

export const queryTournamentAllInfo = tournamentId => (
  dispatch,
  getState,
) => tournamentsActions.findRecord.request({
  id: tournamentId,
  included: 'organizer,sponsors,game_mode,tournament_members,stages',
})(dispatch, getState)
  .then(() => {
    const state = getState()
    const getTournamentById = tournamentsSelectors.getRecordByIdSelector(state)
    const getGameModeById = gameModesSelectors.getRecordByIdSelector(state)
    const currentMember = currentMemberSelector(state)

    const tournament = getTournamentById(tournamentId)
    const gameModeId = tournament.relationships.gameMode.id
    const gameMode = getGameModeById(gameModeId)
    const gameId = gameMode.relationships.game.id
    const voteItemIds = R.pipe(
      R.path(['settings']),
      R.values,
      R.map(R.prop('votePool')),
      R.flatten,
      R.uniq,
    )(tournament)

    const queryGameRequest = gamesActions.findRecord.request({
      id: gameId,
    })

    const rewardMapId = R.pathOr(null, ['relationships', 'rewardMap', 'id'], tournament)
    if (rewardMapId) {
      rewardsActions.queryRecords.request({
        'filter[reward_map]': rewardMapId,
        'page[limit]': 100,
        'filter[max_position]': `lte:${tournament.totalSlots}`,
      })(dispatch, getState)
    }

    const queryVoteItemsRequest = voteItemsActions.queryRecords.request({
      'filter[id]': voteItemIds.join(','),
      'page[limit]': voteItemIds.length,
    })
    const promises = [
      queryGameRequest(dispatch, getState),
      queryVoteItemsRequest(dispatch, getState),
    ]

    if (gameMode.gameModeType === GAME_MODE_TYPES.TEAM) {
      const teamMembersIds = R.pipe(
        R.pathOr([], ['relationships', 'teamMembers']),
        R.map(R.path(['id'])),
      )(currentMember)

      const queryTeamRequest = teamsActions.queryRecords.request({
        included: 'team_members,game_mode',
        'filter[status]': `${TEAM_STATUSES.ACTIVE},${TEAM_STATUSES.BANNED}`,
        'filter[team_members.id]': teamMembersIds.join(','),
        'filter[game_mode.id]': gameModeId,
        expanded: 'team_members',
        'page[limit]': 1,
      })

      return Promise.all([
        queryTeamRequest(dispatch, getState),
        ...promises,
      ])
        .then(([teamResponse]) => {
          const membersIds = R.pipe(
            R.pathOr({}, ['included', 'teamMember']),
            R.map(R.path(['relationships', 'member', 'data', 'id'])),
            R.values,
          )(teamResponse)
          const queryMembersRequest = membersActions.queryRecords.request({
            'filter[id]': membersIds.join(','),
            'page[limit]': membersIds.length,
          })
          return queryMembersRequest(dispatch, getState)
        })
    }

    return Promise.all([
      ...promises,
    ])
  })
  .catch(error => Promise.reject(error))
