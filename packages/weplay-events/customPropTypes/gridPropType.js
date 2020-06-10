import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  participantsNumber: PropTypes.number,
})
