import PropTypes from 'prop-types'

export default PropTypes.shape({
  eventCategory: PropTypes.string.isRequired,
  eventAction: PropTypes.string.isRequired,
})
