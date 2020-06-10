import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Status from 'weplay-competitive/components/Status'
import { memberInfoSelectors } from 'weplay-competitive/reduxs/memberInfoV3'
import PlayerAvatar from 'weplay-competitive/components/PlayerAvatar'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'

import styles from './VotingUser.scss'

const avatarResponsive = {
  sm: '96',
}

const VotingUser = ({
  stepName,
  memberId,
  votingMemberId,
  minutes,
  seconds,
  voteDuration,
}) => {
  const t = useTranslation()
  const currentMember = useSelector(currentMemberSelector)

  const startingPoint = 0
  const circumference = 201

  const member = useSelector(memberInfoSelectors.createRecordByIdSelector(memberId))

  const totalSeconds = useMemo(
    () => voteDuration - (Number(minutes) * 60) - Number(seconds),
    [voteDuration, minutes, seconds],
  )

  const dashOffset = useMemo(
    // eslint-disable-next-line no-mixed-operators
    () => (startingPoint - (totalSeconds * circumference / voteDuration)) || 0,
    [minutes, seconds, voteDuration],
  )

  const isVoting = memberId === votingMemberId

  const stepDetails = votingMemberId === currentMember.id ? 'yourTurn' : 'opponentsTurn'

  return member.isFetched && (
    <div className={styles.block}>
      <div className={styles.wrapper}>
        <PlayerAvatar
          id={memberId}
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
              stroke="#ff1967"
            />
          )}
        </svg>
      </div>
      <span className={styles.name}>
        {member.nickname}
      </span>
      {isVoting && (
        <Status
          isWarning={stepName === 'DROP'}
          isSuccess={stepName === 'PICK'}
          className={styles.status}
        >
          {t(`competitive.matchmaking.mapVoting.${stepDetails}`)}
        </Status>
      )}
    </div>
  )
}

VotingUser.propTypes = {
  stepName: PropTypes.string.isRequired,
  memberId: PropTypes.number.isRequired,
  votingMemberId: PropTypes.number.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  voteDuration: PropTypes.number.isRequired,
}

VotingUser.defaultProps = {}

export default VotingUser
