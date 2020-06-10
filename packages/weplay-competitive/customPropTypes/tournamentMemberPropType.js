import PropTypes from 'prop-types'
import * as R from 'ramda'

import { ROLES } from 'weplay-competitive/constants/roles'
import { TOURNAMENT_MEMBER_STATUSES } from 'weplay-competitive/constants/tournamentMemberStatuses'

export default PropTypes.shape({
  role: PropTypes.oneOf(R.values(ROLES)),
  status: PropTypes.oneOf(R.values(TOURNAMENT_MEMBER_STATUSES)),

  relationships: PropTypes.shape({
    member: PropTypes.shape({
      type: PropTypes.oneOf(['Member']),
    }).isRequired,
    tournament: PropTypes.shape({
      type: PropTypes.oneOf(['Tournament']),
    }).isRequired,
    team: PropTypes.shape({
      type: PropTypes.oneOf(['Team']),
    }),
  }),
})
