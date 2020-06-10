import PropTypes from 'prop-types'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

export default PropTypes.shape({
  url: imgPropType.isRequired,
  alt: PropTypes.string.isRequired,
})
