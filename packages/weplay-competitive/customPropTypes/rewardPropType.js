import PropTypes from 'prop-types'

export default PropTypes.shape({
  isFetched: PropTypes.bool,
  id: PropTypes.number,
  type: PropTypes.string,
  rewardType: PropTypes.string,
  minPosition: PropTypes.number,
  maxPosition: PropTypes.number,
  amountUsd: PropTypes.string,
  amountWp: PropTypes.string,
  amountTotalUsd: PropTypes.string,
  createDatetime: PropTypes.string,
  updateDatetime: PropTypes.string,
})
