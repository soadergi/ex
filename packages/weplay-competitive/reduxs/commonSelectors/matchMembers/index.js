import * as R from 'ramda'
import { createSelector } from 'reselect'

import { matchesSelectors } from 'weplay-competitive/reduxs/matches'
import { matchMembersSelectors } from 'weplay-competitive/reduxs/matchMembers'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'
import { MATCH_MEMBER_STATUSES } from 'weplay-competitive/constants/matchMemberStatuses'
import { TOURNAMENT_MEMBER_ROLES } from 'weplay-competitive/constants/tournamentMemberRoles'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'

export const createParticipantActiveSelector = (mapPropsToMatchId, participationType) => createSelector(
  [
    matchesSelectors.createRecordByIdSelector(mapPropsToMatchId),
    matchMembersSelectors.getRecordByIdSelector,
    tournamentsSelectors.getRecordByIdSelector,
    gameModesSelectors.getRecordByIdSelector,
    tournamentMembersSelectors.getRecordByIdSelector,
  ],
  (match, getMatchMembersById, getTournamentById, getGameModeById, getTournamentMemberById) => {
    const onlinePlayers = R.pipe(
      R.pathOr([], ['relationships', 'members']),
      R.map(
        R.pipe(
          R.path(['id']),
          getMatchMembersById,
        ),
      ),
      R.filter(R.allPass([
        R.propEq('participationType', participationType),
        R.anyPass([
          R.propEq('status', MATCH_MEMBER_STATUSES.ONLINE),
          R.propEq('status', MATCH_MEMBER_STATUSES.READY),
        ]),
      ])),
    )(match)

    const isCaptainOnline = R.pipe(
      R.map(
        R.pipe(
          R.pathOr('', ['relationships', 'tournamentMember', 'id']),
          getTournamentMemberById,
        ),
      ),
      R.any(R.propEq('role', TOURNAMENT_MEMBER_ROLES.CAPTAIN)),
    )(onlinePlayers)

    const teamSize = R.pipe(
      R.pathOr('', ['relationships', 'tournament', 'id']),
      getTournamentById,
      R.pathOr('', ['relationships', 'gameMode', 'id']),
      getGameModeById,
      R.propOr(0, 'size'),
    )(match)

    return onlinePlayers.length >= teamSize && isCaptainOnline
  },
)

export const createIsCurrentParticipantReadySelector = mapPropsToMatchId => createSelector(
  [
    matchesSelectors.createRecordByIdSelector(mapPropsToMatchId),
    matchMembersSelectors.getRecordByIdSelector,
    tournamentMembersSelectors.getRecordByIdSelector,
    currentMemberSelector,
  ],
  (match, getMatchMembersById, getTournamentMemberById, currentMember) => R.pipe(
    R.pathOr([], ['relationships', 'members']),
    R.map(
      R.pipe(
        R.path(['id']),
        getMatchMembersById,
      ),
    ),
    R.filter(R.propEq('status', MATCH_MEMBER_STATUSES.READY)),
    R.map(
      R.pathOr('', ['relationships', 'tournamentMember', 'id']),
    ),
    R.intersection(
      R.pipe(
        R.pathOr([], ['relationships', 'tournamentMembers']),
        R.map(R.prop('id')),
      )(currentMember),
    ),
    R.complement(R.isEmpty),
  )(match),
)

export const countOnlineParticipantsSelector = (mapPropsToMatchId, participationType) => createSelector(
  [
    matchesSelectors.createRecordByIdSelector(mapPropsToMatchId),
    matchMembersSelectors.getRecordByIdSelector,
  ],
  (match, getMatchMembersById) => R.pipe(
    R.pathOr([], ['relationships', 'members']),
    R.map(
      R.pipe(
        R.path(['id']),
        getMatchMembersById,
      ),
    ),
    R.filter(R.allPass([
      R.propEq('participationType', participationType),
      R.anyPass([
        R.propEq('status', MATCH_MEMBER_STATUSES.ONLINE),
        R.propEq('status', MATCH_MEMBER_STATUSES.READY),
      ]),
    ])),
    R.length,
  )(match),
)
