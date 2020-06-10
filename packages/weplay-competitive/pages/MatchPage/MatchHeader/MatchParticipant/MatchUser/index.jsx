import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import UserAvatar from 'weplay-components/UserAvatar'

import styles from '../styles.scss'

const avatarResponsive = {
  sm: '128',
}

const MatchUser = ({
  participantAvatar,
  participantName,
  isActive,
  isPremiumAccount,
}) => (
  <>
    <UserAvatar
      avatar={participantAvatar}
      className={classNames(
        styles.avatar,
        {
          [styles.isActive]: isActive,
          [styles.isPremiumAccount]: isPremiumAccount,
        },
      )}
      isPremiumAccount={isPremiumAccount}
      size="64"
      isPlaceholderDark
      responsive={avatarResponsive}
    />
    <p className={classNames(
      styles.name,
      {
        [styles.isActive]: isActive,
      },
    )}
    >
      {participantName}
    </p>
  </>
)

MatchUser.propTypes = {
  isActive: PropTypes.bool.isRequired,
  participantAvatar: imgPropType.isRequired,
  participantName: PropTypes.string.isRequired,
  isPremiumAccount: PropTypes.bool.isRequired,
}

export default MatchUser
