import PropTypes from 'prop-types'
import * as R from 'ramda'

import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'

export default PropTypes.shape({
  status: PropTypes.oneOf(R.values(MATCH_STATUSES)),
  score1: PropTypes.number,
  score2: PropTypes.number,
  startDatetime: PropTypes.string,
  endDatetime: PropTypes.string,
  matchLink: PropTypes.string, // preapproved by BE but not implemented

  relationships: PropTypes.shape({
    lobby: PropTypes.shape({
      type: PropTypes.oneOf(['Lobby']),
    }),
    node: PropTypes.shape({
      type: PropTypes.oneOf(['Node']),
    }).isRequired,
    player1: PropTypes.shape({
      type: PropTypes.oneOf(['TournamentMember']),
    }).isRequired,
    player2: PropTypes.shape({
      type: PropTypes.oneOf(['TournamentMember']),
    }).isRequired,
    winner: PropTypes.shape({
      type: PropTypes.oneOf(['TournamentMember']),
    }),
  }),
})
