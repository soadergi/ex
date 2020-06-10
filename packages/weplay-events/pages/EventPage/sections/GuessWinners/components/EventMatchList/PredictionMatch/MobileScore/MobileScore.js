import React from 'react'
import PropTypes from 'prop-types'

import ParticipantScore from './ParticipantScore'
import styles from './MobileScore.scss'

const MobileScore = ({ participants }) => (
  <div className={styles.block}>
    <ParticipantScore
      isWinner={participants[0].score > participants[1].score}
      score={participants[0].score}
    />

    <span className={styles.separator}>:</span>

    <ParticipantScore
      isWinner={participants[1].score > participants[0].score}
      score={participants[1].score}
    />
  </div>
)

MobileScore.propTypes = {
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.number,
    }),
  ).isRequired,
}

export default React.memo(MobileScore)
