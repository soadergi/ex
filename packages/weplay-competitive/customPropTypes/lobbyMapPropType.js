import * as R from 'ramda'
import PropTypes from 'prop-types'

import { LOBBY_MAP_VOTES } from 'weplay-competitive/constants/lobbyMapVotes'
import { LOBBY_MAP_STATUSES } from 'weplay-competitive/constants/lobbyMapStatuses'

export default PropTypes.shape({
  status: PropTypes.oneOf(R.values(LOBBY_MAP_STATUSES)).isRequired,
  vote: PropTypes.oneOf(R.values(LOBBY_MAP_VOTES)).isRequired,
  updateDatetime: PropTypes.string,

  relationships: PropTypes.shape({
    member: PropTypes.shape({
      type: PropTypes.oneOf(['Member']),
    }),
    lobby: PropTypes.shape({
      type: PropTypes.oneOf(['Lobby']),
    }).isRequired,

    map: PropTypes.shape({
      type: PropTypes.oneOf(['VoteItem']),
    }),
  }).isRequired,
})
