import PropTypes from 'prop-types'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  user: PropTypes.shape({
    nickname: PropTypes.string,
    avatar: imgPropType,
    isPremiumAccount: PropTypes.bool,
  }).isRequired,
})
