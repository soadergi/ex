import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
})
