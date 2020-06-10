import PropTypes from 'prop-types'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

export default PropTypes.shape({
  id: PropTypes.number,
  fullChallongeUrl: imgPropType,
  name: PropTypes.string,
  state: PropTypes.string,
  startAt: PropTypes.string,
  startedAt: PropTypes.string,
  tournamentType: PropTypes.string,
  participantsCount: PropTypes.number,
})
