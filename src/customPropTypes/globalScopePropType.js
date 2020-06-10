import PropTypes from 'prop-types'

export default PropTypes.shape({
  localStorage: PropTypes.shape({
    setItem: PropTypes.func.isRequired,
  }).isRequired,
})
