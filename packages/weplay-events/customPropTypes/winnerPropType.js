import PropTypes from 'prop-types'

export default PropTypes.arrayOf(
  PropTypes.shape({
    uuid: PropTypes.string,
    prize: PropTypes.string,
    nickname: PropTypes.string,
    picture: PropTypes.string,
  }),
)
