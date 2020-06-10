import PropTypes from 'prop-types'
import * as R from 'ramda'

import { LOBBY_MAP_VOTES } from 'weplay-competitive/constants/lobbyMapVotes'
import { MATCH_MEMBER_PARTICIPATION_TYPES } from 'weplay-competitive/constants/matchMemberParticipationTypes'

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  isMemberWhoVotedThisMapAway: PropTypes.bool,
  round: PropTypes.shape({
    score1: PropTypes.number,
    score2: PropTypes.number,
  }),
  lobbyMap: PropTypes.shape({
    isFetched: PropTypes.bool,
    relationships: PropTypes.shape({
      member: PropTypes.shape({
        type: PropTypes.oneOf(['Member']),
        id: PropTypes.number,
      }),
      map: PropTypes.shape({
        type: PropTypes.oneOf(['VoteItem']),
        id: PropTypes.number,
      }),
    }),
    vote: PropTypes.oneOf(R.values(LOBBY_MAP_VOTES)),
  }),
  voteItem: PropTypes.shape({
    name: PropTypes.string,
  }),
  winner: PropTypes.oneOf(R.append('', R.values(MATCH_MEMBER_PARTICIPATION_TYPES))),
  isRoundInProgress: PropTypes.bool.isRequired,
})
