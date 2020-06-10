import PropTypes from 'prop-types'

export default PropTypes.shape({
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  detailsLink: PropTypes.string,
  discipline: PropTypes.string,
  id: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
  tournamentInfo: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string,
  })),
  tournamentTitle: PropTypes.string,
  winnerLogo: PropTypes.string,
  winnerTitle: PropTypes.string,
  location: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
  }),
})
