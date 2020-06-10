import PropTypes from 'prop-types'
import * as R from 'ramda'

import { MATCH_MEMBER_PARTICIPATION_TYPES } from 'weplay-competitive/constants/matchMemberParticipationTypes'
import { MATCH_MEMBER_STATUSES } from 'weplay-competitive/constants/matchMemberStatuses'

export default PropTypes.shape({
  status: PropTypes.oneOf(R.values(MATCH_MEMBER_STATUSES)),
  participationType: PropTypes.oneOf(R.values(MATCH_MEMBER_PARTICIPATION_TYPES)),

  relationships: PropTypes.shape({
    match: PropTypes.shape({
      type: PropTypes.oneOf(['Match']),
    }).isRequired,
    tournamentMember: PropTypes.shape({
      type: PropTypes.oneOf(['TournamentMember']),
    }).isRequired,
  }),
})
