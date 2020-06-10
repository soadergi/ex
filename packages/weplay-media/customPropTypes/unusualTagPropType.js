import PropTypes from 'prop-types'

import mediaPropType from './mediaPropType'

export default PropTypes.shape({
  bgImage: mediaPropType,
  avatar: mediaPropType,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
})
