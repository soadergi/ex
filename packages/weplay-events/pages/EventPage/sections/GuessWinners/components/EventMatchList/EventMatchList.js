import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import InitialPreloader from 'weplay-components/InitialPreloader'

import ShowHideButton from 'weplay-events/pages/EventPage/components/ShowHideButton/ShowHideButton'
import useMatchListShowHideButton from 'weplay-events/pages/EventPage/hooks/useMatchListShowHideButton'

import PredictionMatchesByDateSection from './PredictionMatchesByDateSection/PredictionMatchesByDateSection'
import usePredictionsMatchList from './usePredictionsMatchList'
import styles from './EventMatchList.scss'

function EventMatchList({ isActive, setIsModalOpened }) {
  const { sortedByDateGridMatches, makePrediction } = usePredictionsMatchList(setIsModalOpened)

  const {
    ref,
    toggleOpenMatchesList,
    isMatchesListOpened,
    gridMatches,
  } = useMatchListShowHideButton(sortedByDateGridMatches)

  if (!isActive) return null

  return (
    <>
      <div
        className={classNames(
          styles.block,
          { [styles.isOpened]: isMatchesListOpened },
        )}
        ref={ref}
      >
        {gridMatches.map(matchesByDate => (
          <PredictionMatchesByDateSection
            key={matchesByDate?.matches?.[0]?.id}
            matchesByDate={matchesByDate}
            makePrediction={makePrediction}
          />
        ))}

        {sortedByDateGridMatches.length === 0 && <InitialPreloader />}
      </div>

      <ShowHideButton
        isOpened={isMatchesListOpened}
        handleClick={toggleOpenMatchesList}
      />
    </>
  )
}

EventMatchList.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setIsModalOpened: PropTypes.func.isRequired,
}

export default React.memo(EventMatchList)
