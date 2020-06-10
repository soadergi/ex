import PropTypes from 'prop-types'

export default PropTypes.shape({
  days: PropTypes.string.isRequired,
  hours: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  isPassed: PropTypes.bool.isRequired,
})
