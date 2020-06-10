import React from 'react'

import Icon from 'weplay-components/Icon'
import UserAvatar from 'weplay-components/UserAvatar'

import prizePoolItemPropType from 'weplay-events/customPropTypes/prizePoolParticipantPropType'

import styles from './styles.scss'

const PrizePoolWinner = ({ winner }) => (
  <div className={styles.participant}>
    <UserAvatar
      size="40"
      avatar={winner.logoUrl}
    />

    <p className={styles.nickname}>
      {winner.name || 'TBD'}
      {winner.isInvited && <Icon className={styles.invitedTeamIcon} />}
    </p>
  </div>
)

PrizePoolWinner.propTypes = {
  winner: prizePoolItemPropType.isRequired,
}

export default PrizePoolWinner
