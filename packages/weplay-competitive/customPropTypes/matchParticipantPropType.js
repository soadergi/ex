import PropTypes from 'prop-types'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

export default PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.number,
  type: PropTypes.string,
  avatar: imgPropType,
})
