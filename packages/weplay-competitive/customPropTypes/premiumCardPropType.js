import PropTypes from 'prop-types'

export default PropTypes.shape({
  discount: PropTypes.number,
  period: PropTypes.number,
  usdPrice: PropTypes.number,
  wpPrice: PropTypes.number,
  subscriptionId: PropTypes.number,
})
