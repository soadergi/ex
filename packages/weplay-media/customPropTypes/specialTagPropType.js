import PropTypes from 'prop-types'

import mediaPropType from './mediaPropType'

export default PropTypes.shape({
  bgColor: PropTypes.string,
  bgImage: mediaPropType,
  avatar: mediaPropType,
  name: PropTypes.string.isRequired,
  shortDescription: PropTypes.string, // TODO: add required here, when all related data will be camelized
})
