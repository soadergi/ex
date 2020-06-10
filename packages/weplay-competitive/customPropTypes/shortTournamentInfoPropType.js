import PropTypes from 'prop-types'

export default PropTypes.shape({
  status: PropTypes.string.isRequired,
  startDatetime: PropTypes.string.isRequired,
  emptySlots: PropTypes.number.isRequired,
  prize: PropTypes.string,
  regWillBeOpened: PropTypes.string,
  winner: PropTypes.string,
})
