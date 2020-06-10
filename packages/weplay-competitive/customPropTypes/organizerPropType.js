import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.number,
  logo: PropTypes.string,
  name: PropTypes.string,

  lang: PropTypes.shape({
    name: PropTypes.string,
  }),
  createDatetime: PropTypes.string,
})
