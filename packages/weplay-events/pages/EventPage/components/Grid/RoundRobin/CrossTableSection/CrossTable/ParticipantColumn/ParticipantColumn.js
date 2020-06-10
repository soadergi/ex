import React from 'react'
import PropTypes from 'prop-types'

import Participant from '../Participant/Participant'

import styles from './ParticipantColumn.scss'

const ParticipantColumn = ({ participants, withDuplicates }) => (
  <div className={styles.block}>
    {participants.map((participant, index) => (
      <Participant
        key={participant.id}
        className={styles.team}
        participant={participant}
        isHidden={index === 0 && !withDuplicates}
        hasName
      />
    ))}
    <div className={styles.lastEmptyCell} />
  </div>
)

ParticipantColumn.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  withDuplicates: PropTypes.bool.isRequired,
}

export default React.memo(ParticipantColumn)
