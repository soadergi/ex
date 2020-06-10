import * as R from 'ramda'

import { NAMES } from 'weplay-core/routes'

import { lobbiesSelectors } from 'weplay-competitive/reduxs/lobbies'
import { voteItemsActions } from 'weplay-competitive/reduxs/voteItems'
import { tournamentsActions } from 'weplay-competitive/reduxs/tournaments'
import { matchesActions, matchesSelectors } from 'weplay-competitive/reduxs/matches'
import { matchMembersSelectors } from 'weplay-competitive/reduxs/matchMembers'
import { tournamentMembersActions } from 'weplay-competitive/reduxs/tournamentMembers'
import { lobbyMapsActions } from 'weplay-competitive/reduxs/lobbyMaps'
import { getMatchStatistic } from 'weplay-competitive/reduxs/statistic/actions'

export const getInitialData = ({
  matchId,
  history,
}) => (
  dispatch,
  getState,
) => matchesActions.findRecord.request({
  id: matchId,
  included: 'player1,player2,winner,lobby,members',
})(dispatch, getState)
  .then(() => {
    const state = getState()
    const getMatchMemberById = matchMembersSelectors.getRecordByIdSelector(state)
    const getMatchById = matchesSelectors.getRecordByIdSelector(state)
    const getLobbyById = lobbiesSelectors.getRecordByIdSelector(state)

    const match = getMatchById(matchId)

    const voteItemIds = R.pipe(
      R.path(['relationships', 'lobby', 'id']),
      getLobbyById,
      R.pathOr([], ['settings', 'votePool']),
      R.uniq,
    )(match)
    const voteItemsPromise = match.relationships.lobby
      ? voteItemsActions.queryRecords.request({
        'filter[id]': voteItemIds.join(','),
        'page[limit]': voteItemIds.length,
      })(dispatch, getState)
      : null

    const lobbyMapsPromise = R.pipe(
      R.path(['relationships', 'lobby', 'id']),
      R.ifElse(
        R.isNil,
        R.always(null),
        lobbyId => lobbyMapsActions.queryRecords.request({
          'filter[lobby.id]': lobbyId,
          included: 'map',
        })(dispatch, getState),
      ),
    )(match)

    const tournamentsPromise = tournamentsActions.findRecord.request({
      id: match.relationships.tournament.id,
      included: 'game_mode',
    })(dispatch, getState)

    const tournamentMemberIds = R.pipe(
      R.pathOr([], ['relationships', 'members']),
      R.map(R.pipe(
        R.path(['id']),
        getMatchMemberById,
        R.path(['relationships', 'tournamentMember', 'id']),
      )),
    )(match)

    const tournamentMembersPromise = match.relationships.lobby
      ? tournamentMembersActions.queryRecords.request({
        'filter[id]': tournamentMemberIds.join(','),
        included: 'team,member',
        'page[limit]': tournamentMemberIds.length,
      })(dispatch, getState)
      : null

    getMatchStatistic.request(matchId)(dispatch, getState)

    return Promise.all([
      tournamentsPromise,
      lobbyMapsPromise,
      // membersAndTeamsPromise,
      voteItemsPromise,
      tournamentMembersPromise,
    ])
  }, (error) => {
    if (R.pathEq(['error', 'status'], 404)(error)) {
      history.replace(`/${NAMES.NOT_FOUND}`)
    }
    return Promise.reject(error)
  })
