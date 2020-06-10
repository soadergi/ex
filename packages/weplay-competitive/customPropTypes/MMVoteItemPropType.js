import PropTypes from 'prop-types'

export default PropTypes.shape({
  matchId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
})
