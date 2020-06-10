import PropTypes from 'prop-types'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

export default PropTypes.shape({
  status: PropTypes.string,
  userName: PropTypes.string,
  role: PropTypes.string,
  avatar: imgPropType,
})
