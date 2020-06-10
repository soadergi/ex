import PropTypes from 'prop-types'
import * as R from 'ramda'

import { MATCH_STATUSES } from 'weplay-competitive/constants/MM/matchStatuses'

export default PropTypes.shape({
  status: PropTypes.oneOf(R.values(MATCH_STATUSES)).isRequired,
  scoreLeft: PropTypes.number,
  scoreRight: PropTypes.number,
  id: PropTypes.number.isRequired,
  gameModeId: PropTypes.number.isRequired,
  startDatetime: PropTypes.string,
  endDatetime: PropTypes.string.isRequired,
  matchLink: PropTypes.string.isRequired,
  teamLeft: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
  teamRight: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
})
