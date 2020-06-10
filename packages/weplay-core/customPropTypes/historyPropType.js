import PropTypes from 'prop-types'

export default PropTypes.shape({
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  push: PropTypes.func.isRequired,
  go: PropTypes.func.isRequired,
})
