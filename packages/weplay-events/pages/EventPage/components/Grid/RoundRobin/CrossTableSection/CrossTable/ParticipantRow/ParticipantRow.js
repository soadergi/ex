import React from 'react'
import PropTypes from 'prop-types'

import Participant from '../Participant/Participant'

import styles from './ParticipantRow.scss'

const ParticipantRow = ({ participants, withDuplicates }) => (
  <div className={styles.block}>
    {participants.map((participant, index) => (
      <Participant
        key={participant.id}
        className={styles.team}
        participant={participant}
        isHidden={index === participants.length - 1 && !withDuplicates}
      />
    ))}
  </div>
)

ParticipantRow.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  withDuplicates: PropTypes.bool.isRequired,
}

export default React.memo(ParticipantRow)
