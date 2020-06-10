import PropTypes from 'prop-types'

export default PropTypes.shape({
  start: PropTypes.date,
  parentId: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  disableRemove: PropTypes.bool,
})
