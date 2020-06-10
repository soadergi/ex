import PropTypes from 'prop-types'

import memberPropType from 'weplay-competitive/customPropTypes/memberPropType'
import teamPropType from 'weplay-competitive/customPropTypes/teamPropType'

export default PropTypes.oneOfType([
  memberPropType,
  teamPropType,
])
