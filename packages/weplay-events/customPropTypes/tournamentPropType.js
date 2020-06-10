import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.string,
  fullName: PropTypes.string,
  shortName: PropTypes.string,
  slug: PropTypes.string,
  status: PropTypes.string,
  prizePool: PropTypes.string,
  prizePoolDescription: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  participantsAmount: PropTypes.number,
  relationships: PropTypes.shape({}),
})
