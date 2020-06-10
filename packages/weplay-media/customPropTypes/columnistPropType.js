import PropTypes from 'prop-types'

import mediaPropType from 'weplay-media/customPropTypes/mediaPropType'

export default PropTypes.shape({
  columnistId: PropTypes.number,
  avatar: mediaPropType,
  firstName: PropTypes.string,
  nickName: PropTypes.string,
  lastName: PropTypes.string,
  title: PropTypes.string,
})
