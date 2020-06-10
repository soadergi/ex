import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import Participant from './Participant/Participant'
import styles from './PredictionMatchParticipant.scss'

const PredictionMatchParticipant = ({
  participant,
  isWinner,
}) => {
  const isMobileWidth = useSelector(isMobileWidthSelector)

  return (
    <div className={styles.block}>
      <Participant
        className={styles.player}
        classNameWrapText={styles.wrapText}
        classNameCountryImg={styles.countryImg}
        participant={participant}
        isWinner={isWinner}
      />

      {!isMobileWidth && (
        <div
          className={classNames(
            styles.score,
            { [styles.isWinner]: isWinner },
          )}
        >
          {participant.score ?? '-'}
        </div>
      )}
    </div>
  )
}

PredictionMatchParticipant.propTypes = {
  isWinner: PropTypes.bool.isRequired,
  participant: PropTypes.shape({
    score: PropTypes.number,
  }),
}

PredictionMatchParticipant.defaultProps = {
  participant: {},
}

export default PredictionMatchParticipant
