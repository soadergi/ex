import PropTypes from 'prop-types'

export default PropTypes.shape({
  startDatetime: PropTypes.string,
  status: PropTypes.string.isRequired,
  score1: PropTypes.number.isRequired,
  score2: PropTypes.number.isRequired,
})
