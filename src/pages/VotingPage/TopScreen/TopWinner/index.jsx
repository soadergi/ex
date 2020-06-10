import React from 'react'
import UserAvatarLegacy from 'weplay-components/UserAvatarLegacy'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import container from './container'


const TopWinner = ({
  candidate,
}) => (
  <div
    className={styles.winner}
  >
    <UserAvatarLegacy
      avatar={candidate.pictureUrl}
      className={styles.avatar}
    />
    <div className={styles.nameWrap}>
      <span className={styles.name}>{candidate.title}</span>
    </div>
  </div>
)

TopWinner.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    votingId: PropTypes.number.isRequired,
    pictureUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    votesCount: PropTypes.number.isRequired,
    nextVoteDatetime: PropTypes.string,
    callerCanVote: PropTypes.bool.isRequired,
    description: PropTypes.string,
  }).isRequired,
}

export default container(TopWinner)
