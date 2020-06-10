import PropTypes from 'prop-types'

export default PropTypes.shape({
  image: PropTypes.shape({}),
  link: PropTypes.string,
  name: PropTypes.string,
  ladders: PropTypes.arrayOf(PropTypes.string),
  gameSessions: PropTypes.number,
  gamePlayers: PropTypes.number,
  prizes: PropTypes.shape({}),
  rulesLink: PropTypes.string,
  socials: PropTypes.shape({}),
  seo: PropTypes.shape({}),
})
