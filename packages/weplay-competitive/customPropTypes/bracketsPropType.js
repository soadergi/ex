import PropTypes from 'prop-types'

export default PropTypes.shape({
  isFetched: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['', 'Node']).isRequired,
  leftKey: PropTypes.number,
  rightKey: PropTypes.number,
  round: PropTypes.number,
})
