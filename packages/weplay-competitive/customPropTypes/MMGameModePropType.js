import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  mode: PropTypes.shape({
    title: PropTypes.string,
    teamSize: PropTypes.number,
    type: PropTypes.string,
  }).isRequired,
  voteItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      logo: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
})
