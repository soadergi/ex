import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector, isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import Participant from './Participant/Participant'
import styles from './LeaderBoardParticipant.scss'

const LeaderBoardParticipant = ({
  participant,
  isMarked,
}) => {
  const t = useTranslation()
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const isTabletWidth = useSelector(isTabletWidthSelector)

  return (
    <li
      className={classNames(
        styles.block,
        { [styles.isMarked]: isMarked },
      )}
    >
      <span className={styles.number}>{`#${participant.position}`}</span>

      <Participant
        participant={participant}
        isMarked={isMarked}
      />

      {!isMobileWidth && !isTabletWidth && (
        <span className={styles.text}>
          {`${
            participant.predictions
          } ${
            t('events.predictionsMainBlock.leaderboard.leaderboardParticipant.predictionCountText')
          }`}
        </span>
      )}

      <span className={styles.text}>
        {`${
          participant.score ?? 0
        } ${
          t('events.predictionsMainBlock.leaderboard.leaderboardParticipant.predictionPointsText')
        }`}
      </span>
    </li>
  )
}

LeaderBoardParticipant.propTypes = {
  participant: PropTypes.shape({
    id: PropTypes.number,
    predictions: PropTypes.number,
    score: PropTypes.number,
    position: PropTypes.number,
  }).isRequired,
  isMarked: PropTypes.bool.isRequired,
}

export default React.memo(LeaderBoardParticipant)
