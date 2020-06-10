import PropTypes from 'prop-types'

const roundPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  order: PropTypes.number,
  isHidden: PropTypes.bool,
})

export default roundPropType
