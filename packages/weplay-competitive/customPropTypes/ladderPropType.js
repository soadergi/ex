import PropTypes from 'prop-types'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  isFetched: PropTypes.bool.isRequired,
  playersCount: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  ladderType: PropTypes.string.isRequired,
  ladderStatus: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  backgroundImageUrl: imgPropType,
  isTopPriority: PropTypes.bool,
  ladderPrizes: PropTypes.arrayOf(
    PropTypes.shape({
      startDate: PropTypes.string,
      status: PropTypes.string,
      bracket: PropTypes.string,
      details: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          type: PropTypes.string,
          place: PropTypes.number,
          description: PropTypes.string,
        }),
      ),
    }),
  ),
})
