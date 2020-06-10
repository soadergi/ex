import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import UserAvatar from 'weplay-components/UserAvatar'

import Status from 'weplay-competitive/components/Status'
import matchParticipantPropType from 'weplay-competitive/customPropTypes/matchParticipantPropType'

import container from './container'
import styles from './styles.scss'

const avatarResponsive = {
  sm: '96',
}

const VotingUser = ({
  // required props
  status,
  // container props
  dashOffset,
  isVoting,
  participant,
  // optional props
}) => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <div className={styles.wrapper}>
        <UserAvatar
          avatar={participant.avatar}
          isPremiumAccount={participant.isPremiumAccount}
          size="64"
          responsive={avatarResponsive}
          isPlaceholderDark
        />
        <svg
          height="64"
          width="64"
          viewBox="0 0 69 69"
          className={styles.time}
        >
          <circle
            cx="50%"
            cy="50%"
            r="32"
            fill="none"
            strokeWidth="1"
            stroke="#3bbbe9"
          />
          {isVoting && (
            <circle
              cx="50%"
              cy="50%"
              r="32"
              fill="none"
              strokeWidth="4"
              strokeDashoffset={dashOffset}
              strokeDasharray="201"
              stroke="#e30e2c"
            />
          )}
        </svg>
      </div>
      <span className={styles.name}>
        {participant.name}
      </span>
      <Status
        isWarning={status === 'DROP'}
        isSuccess={status === 'PICK'}
        className={styles.status}
      >
        {t(`competitive.match.mapVoting.buttons.${status}`)}
      </Status>
    </div>
  )
}

VotingUser.propTypes = {
  // required props
  status: PropTypes.string.isRequired,
  // container props
  isVoting: PropTypes.bool.isRequired,
  participant: matchParticipantPropType.isRequired,
  // optional props
  dashOffset: PropTypes.number,
}

VotingUser.defaultProps = {
  // optional props
  dashOffset: 0,
}

export default container(VotingUser)
