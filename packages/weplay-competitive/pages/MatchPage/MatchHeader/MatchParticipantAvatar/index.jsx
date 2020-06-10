import React from 'react'
import PropTypes from 'prop-types'
import UserAvatar from 'weplay-components/UserAvatar'
import participantPropType from 'weplay-competitive/customPropTypes/participantPropType'

import container from './container'

const avatarResponsive = {
  sm: '48',
  lg: '64',
}

const MatchParticipantAvatar = ({
  // required props

  // container props
  isActive,
  participant,

  // optional props
}) => participant.isFetched && (
  <div>
    {participant.name}
    {isActive ? 'active' : 'inactive'}
    <UserAvatar
      avatar={participant.avatar}
      size="40"
      responsive={avatarResponsive}
    />
  </div>
)

MatchParticipantAvatar.propTypes = {
  // required props

  // container props
  isActive: PropTypes.bool.isRequired,
  participant: participantPropType.isRequired,
  // optional props
}

MatchParticipantAvatar.defaultProps = {
  // optional props
}

export default container(MatchParticipantAvatar)
