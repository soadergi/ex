import * as R from 'ramda'
import PropTypes from 'prop-types'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import { MEMBER_STATUSES } from 'weplay-competitive/constants/memberStatuses'

export const getGeneralFields = type => ({
  isFetched: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['', type]).isRequired,

  name: PropTypes.string,
  createDatetime: PropTypes.string,
  status: PropTypes.oneOf(R.values(MEMBER_STATUSES)),

  avatar: imgPropType,
  backgroundAvatar: imgPropType,
  isPremiumAccount: PropTypes.bool,
})
export default PropTypes.shape({
  ...getGeneralFields('Team'),

  updateDatetime: PropTypes.string,
  tag: PropTypes.string,
})
