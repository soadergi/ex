import PropTypes from 'prop-types'

export default PropTypes.shape({
  gameMode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  bracket: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  emptySlots: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
})
