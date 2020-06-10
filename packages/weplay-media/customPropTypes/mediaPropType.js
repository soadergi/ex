import PropTypes from 'prop-types'

export default PropTypes.shape({
  mediaId: PropTypes.number, // TODO: add required here, when all related data will be camelized
  mediaType: PropTypes.number, // TODO: add required here, when all related data will be camelized
  attributes: PropTypes.shape({
    alt: PropTypes.string,
  }).isRequired,
  path: PropTypes.string.isRequired,
})
