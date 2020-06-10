import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import { MATCH_STATUSES } from 'weplay-events/pages/EventPage/constants'
import useMatchParticipants from 'weplay-events/hooks/useMatchParticipants'

import useMatchPredictions from './useMatchPredictions'
import PredictionMatchHeader from './PredictionMatchHeader/PredictionMatchHeader'
import PredictButton from './PredictButton/PredictButton'
import MobileScore from './MobileScore/MobileScore'
import PredictionMatchParticipant from './PredictionMatchParticipant/PredictionMatchParticipant'
import styles from './PredictionMatch.scss'

const PredictionMatch = ({ match, makePrediction }) => {
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const participants = useMatchParticipants({ match })
  const matchUserPrediction = useMatchPredictions(match.id)
  const isPredictionDisabled = match.status !== MATCH_STATUSES.SCHEDULED

  const handlePredict = useCallback(participantId => () => makePrediction({ participantId, matchId: match.id }),
    [makePrediction, match.id])

  return (
    <div
      className={classNames(
        styles.block,
        { [styles.isFinished]: isPredictionDisabled },
        { [styles.hasPrediction]: Object.keys(matchUserPrediction).length > 0 },
        { [styles.hasGuessed]: matchUserPrediction?.isSuccess === true },
        { [styles.hasNotGuessed]: matchUserPrediction?.isSuccess === false },
      )}
    >
      <PredictionMatchHeader match={match} />

      <PredictButton
        iconClassName={styles.icon}
        textClassName={styles.text}
        handlePredict={handlePredict(participants[0].id)}
        disabled={Object.keys(matchUserPrediction).length > 0 || isPredictionDisabled}
        isPredicted={String(matchUserPrediction?.participantId) === participants[0].id}
        score={matchUserPrediction?.score}
      />

      {isMobileWidth && (
        <MobileScore participants={participants} />
      )}

      <div className={styles.match}>
        <PredictionMatchParticipant
          participant={participants[0]}
          isWinner={isPredictionDisabled && participants[0].score > participants[1].score}
        />

        <span className={styles.versus}>vs</span>

        <PredictionMatchParticipant
          participant={participants[1]}
          isWinner={isPredictionDisabled && participants[0].score < participants[1].score}
        />
      </div>

      <PredictButton
        iconClassName={styles.icon}
        textClassName={styles.text}
        handlePredict={handlePredict(participants[1].id)}
        disabled={Object.keys(matchUserPrediction).length > 0 || isPredictionDisabled}
        isPredicted={String(matchUserPrediction?.participantId) === participants[1].id}
        score={matchUserPrediction?.score}
      />
    </div>
  )
}

PredictionMatch.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    startDatetime: PropTypes.string,
    showStartDatetime: PropTypes.bool,
    disableButton: PropTypes.bool,
    participants: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  makePrediction: PropTypes.func.isRequired,
}

export default React.memo(PredictionMatch)
