import PropTypes from 'prop-types'

export default PropTypes.oneOfType([
  PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    })).isRequired,
    placeholder: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string.isRequired,
  }),
  PropTypes.string,
])
