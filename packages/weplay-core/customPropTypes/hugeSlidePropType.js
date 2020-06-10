import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.number,
  url: PropTypes.string,
  title: PropTypes.string,
  images: PropTypes.shape({
    preview: PropTypes.string,
    lg: PropTypes.string,
    md: PropTypes.string,
  }),
})
