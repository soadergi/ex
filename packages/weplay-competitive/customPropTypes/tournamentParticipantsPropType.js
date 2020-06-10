import PropTypes from 'prop-types'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

export default PropTypes.shape({
  id: PropTypes.number,
  type: PropTypes.string,
  // role: PropTypes.string,
  status: PropTypes.string,
  name: PropTypes.string,
  avatar: imgPropType,
})
