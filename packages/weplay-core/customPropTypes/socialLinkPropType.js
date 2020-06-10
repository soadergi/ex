import PropTypes from 'prop-types'

export default PropTypes.shape({
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string.isRequired,
})
