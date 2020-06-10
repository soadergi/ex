import PropTypes from 'prop-types'

export default PropTypes.shape({
  description: PropTypes.string,
  keywords: PropTypes.string,
  nofollow: PropTypes.bool,
  noindex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  title: PropTypes.string,
})
