import PropTypes from 'prop-types'

export default PropTypes.shape({
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
})
