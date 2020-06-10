import PropTypes from 'prop-types'

const mods = [
  'header',
  'mobile',
  'footer',
  'white',
  'promo',
  'teamMember',
  'grey',
  'leaguePage',
  'voteMVP',
]

export default {
  propTypes: {
  // required props
    links: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })).isRequired,

    // optional props
    modifiers: PropTypes.arrayOf(
      PropTypes.oneOf(
        mods.map(mod => mod),
      ),
    ),
    className: PropTypes.string,
    // anal
    position: PropTypes.string,
  },

  defaultProps: {
    modifiers: [],
    className: '',
    position: '',
  },
}
