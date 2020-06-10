import PropTypes from 'prop-types'

export default PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    isFetched: PropTypes.bool,
    id: PropTypes.number,
    logo: PropTypes.string,
    name: PropTypes.string,
  })])
