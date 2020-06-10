import PropTypes from 'prop-types'

import prizePoolItemPropType from './prizePoolParticipantPropType'

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  placeName: PropTypes.string,
  prize: PropTypes.number,
  extraPrize: PropTypes.string,
  extraPrizeIconUrl: PropTypes.string,
  relationships: PropTypes.shape({
    participants: PropTypes.arrayOf(
      prizePoolItemPropType,
    ),
  }),
})
