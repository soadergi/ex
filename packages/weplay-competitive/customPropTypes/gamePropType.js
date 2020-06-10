import PropTypes from 'prop-types'

export default PropTypes.shape({
  isFetched: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['', 'Game']).isRequired,
  logo: PropTypes.string,
  name: PropTypes.string,
})
