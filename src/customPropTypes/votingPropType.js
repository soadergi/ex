import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  createDatetime: PropTypes.string.isRequired,
  finishDatetime: PropTypes.string.isRequired,
  startDatetime: PropTypes.string.isRequired,
  optionsCount: PropTypes.number.isRequired,
  pictureUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  updateDatetime: PropTypes.string,
  parentVoting: PropTypes.shape({}),
})
