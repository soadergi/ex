import PropTypes from 'prop-types'

export default PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  isActive: PropTypes.bool,
  localizations: PropTypes.shape({}),
  locations: PropTypes.arrayOf(PropTypes.shape({})),
}))
