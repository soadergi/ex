import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'
import { createParticipantActiveSelector } from 'weplay-competitive/reduxs/commonSelectors/matchMembers'
import { MATCH_MEMBER_PARTICIPATION_TYPES } from 'weplay-competitive/constants/matchMemberParticipationTypes'
import { lobbiesSelectors } from 'weplay-competitive/reduxs/lobbies'
import { LOBBY_STATUSES } from 'weplay-competitive/constants/lobbyStatuses'
import { createIsMatchTechnicalEndedSelector } from 'weplay-competitive/reduxs/commonSelectors/matches'

const mapPropsToMatchId = props => props?.currentMatch?.id

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isHomeParticipantActive: createParticipantActiveSelector(mapPropsToMatchId, MATCH_MEMBER_PARTICIPATION_TYPES.HOME),
    isAwayParticipantActive: createParticipantActiveSelector(mapPropsToMatchId, MATCH_MEMBER_PARTICIPATION_TYPES.AWAY),
    getLobbyById: lobbiesSelectors.getRecordByIdSelector,
    isMatchTechnicalEnded: createIsMatchTechnicalEndedSelector(mapPropsToMatchId),
  }), {
    // actionCreators
  }),
  withPropsOnChange(
    [
      'currentMatch',
      'getLobbyById',
    ], ({
      currentMatch,
      getLobbyById,
    }) => ({
      isCancelled: currentMatch.status === MATCH_STATUSES.CANCELED,
      isFinished: currentMatch.status === MATCH_STATUSES.FINISHED,
      isOngoing: currentMatch.status === MATCH_STATUSES.ONGOING,
      isUpcoming: currentMatch.status === MATCH_STATUSES.UPCOMING,
      isLobbyReady: R.pipe(
        R.path(['relationships', 'lobby', 'id']),
        getLobbyById,
        lobby => lobby.isFetched && !R.propEq('status', LOBBY_STATUSES.NOT_STARTED, lobby),
      )(currentMatch),
    }),
  ),
  withPropsOnChange(
    [
      'currentMatch',
      'currentMemberId',
    ], ({
      currentMatch,
      currentMemberId,
    }) => {
      const { score1, score2 } = currentMatch
      const isHome = R.pathEq(['relationships', 'player1', 'id'], currentMemberId, currentMatch)
      const memberScore = isHome ? score1 : score2
      const opponentScore = isHome ? score2 : score1
      return {
        score: `${memberScore}:${opponentScore}`,
      }
    },
  ),
)

export default container
