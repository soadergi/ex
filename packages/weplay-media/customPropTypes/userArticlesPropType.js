import PropTypes from 'prop-types'

export default PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    news: PropTypes.shape({}).isRequired,
    userId: PropTypes.number.isRequired,
    viewDate: PropTypes.string,
  }),
)
