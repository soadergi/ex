import PropTypes from 'prop-types'

export default PropTypes.shape({
  isFetched: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['', 'GameMode']).isRequired,

  title: PropTypes.string,
  size: PropTypes.number,
  gameModeType: PropTypes.string,
})
