import * as R from 'ramda'

import { gamesActions } from 'weplay-competitive/reduxs/games'
import { membersActions } from 'weplay-competitive/reduxs/members'
import { tournamentsActions } from 'weplay-competitive/reduxs/tournaments'
import { voteItemsActions } from 'weplay-competitive/reduxs/voteItems'
import { matchMembersActions } from 'weplay-competitive/reduxs/matchMembers'
import { matchesActions } from 'weplay-competitive/reduxs/matches'

export const queryMatchesAllInfo = (memberId, gameId, history, pagination, prevPagination) => (
  dispatch,
  getState,
) => membersActions.findRecord.request({
  id: memberId,
  included: 'team_members',
})(dispatch, getState)
  .then(() => matchMembersActions.queryRecords.request({
    included: 'match,tournament_member',
    'filter[tournament_member.member]': memberId,
    'filter[match.game]': gameId,
    'page[offset]': pagination.offset,
    'page[limit]': pagination.limit || prevPagination.limit,
  })(dispatch, getState)
    .then((matchMembersResponse) => {
      const matches = R.pipe(
        R.pathOr({}, ['included', 'match']),
        R.values,
      )(matchMembersResponse)
      const lobbiesIds = R.pipe(
        R.map(R.pathOr(NaN, ['relationships', 'lobby', 'data', 'id'])),
        R.uniq,
      )(matches)
      const paginationMatches = matchMembersResponse.meta.pagination

      const tournamentFromMatchIds = R.pipe(
        R.map(R.pathOr(NaN, ['relationships', 'tournament', 'data', 'id'])),
        R.uniq,
      )(matches)

      const tournamentsRequest = tournamentsActions.queryRecords.request({
        included: 'stages',
        'filter[id]': tournamentFromMatchIds.join(','),
        'page[limit]': tournamentFromMatchIds.length,
      })(dispatch, getState)

      const queryMatchesRequest = matchesActions.queryRecords.request({
        included: 'node,members,lobby',
        'filter[lobby.id]': lobbiesIds.join(','),
        'page[limit]': lobbiesIds.length,
      })(dispatch, getState)

      return Promise.all([
        tournamentsRequest,
        queryMatchesRequest,
      ])
        .then(([tournamentsResponse, matchesResponse]) => {
          const votePoolIds = R.pipe(
            R.pathOr(NaN, ['included', 'lobby']),
            R.values,
            R.map(R.pathOr([], ['attributes', 'settings', 'votePool'])),
            R.flatten,
            R.uniq,
          )(matchesResponse)

          const gameModesIds = R.pipe(
            R.map(R.pathOr(NaN, ['relationships', 'gameMode', 'data', 'id'])),
            R.uniq,
          )(tournamentsResponse.data)

          const gamesRequest = gamesActions.queryRecords.request({
            included: 'game_modes',
            'filter[game_modes.id]': gameModesIds.join(','),
            'page[limit]': gameModesIds.length,
          })(dispatch, getState)

          const voteItemsRequest = voteItemsActions.queryRecords.request({
            'filter[id]': votePoolIds.join(','),
            'page[limit]': votePoolIds.length,
          })(dispatch, getState)

          return Promise.all([
            gamesRequest,
            voteItemsRequest,
          ])
            .then(() => ([matches, paginationMatches]))
        })
    }))
  .catch((error) => {
    if (R.pathEq(['error', 'status'], 404)(error)) {
      history.replace('/not-found')
    }
    return Promise.reject(error)
  })
