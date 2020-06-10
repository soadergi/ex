import PropTypes from 'prop-types'
import * as R from 'ramda'

import { LOBBY_STATUSES } from 'weplay-competitive/constants/lobbyStatuses'

export default PropTypes.shape({
  duration: PropTypes.number,
  status: PropTypes.oneOf(R.values(LOBBY_STATUSES)),
  startDatetime: PropTypes.string,
  settings: PropTypes.shape({
    qualification: PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      voteFormat: PropTypes.oneOf([
        'best1',
        'best3', // ???
      ]).isRequired,
      votePool: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
      ).isRequired,
      voteTime: PropTypes.number.isRequired,
      voteVetoLogic: PropTypes.string.isRequired,
    }),
  }),

  relationships: PropTypes.shape({
    maps: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['LobbyMap']),
    })).isRequired,
    match: PropTypes.shape({
      type: PropTypes.oneOf(['Match']),
    }).isRequired,
  }),
})
