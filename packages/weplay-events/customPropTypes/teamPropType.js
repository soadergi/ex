import PropTypes from 'prop-types'

export default PropTypes.shape({
  nickname: PropTypes.string,
  picture: PropTypes.string,
  uuid: PropTypes.string,
  players: PropTypes.arrayOf(PropTypes.shape({})),
})
