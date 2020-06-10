import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  logoUrl: PropTypes.string,
  isInvited: PropTypes.bool,
  relationships: PropTypes.shape({}),
})
