import PropTypes from 'prop-types'

export default PropTypes.shape({
  label: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  disabled: PropTypes.bool,
  component: PropTypes.node,
})
