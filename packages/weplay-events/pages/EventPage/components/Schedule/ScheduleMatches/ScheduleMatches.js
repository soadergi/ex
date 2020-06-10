import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import InitialPreloader from 'weplay-components/InitialPreloader'

import useMatchListShowHideButton from 'weplay-events/pages/EventPage/hooks/useMatchListShowHideButton'
import ShowHideButton from 'weplay-events/pages/EventPage/components/ShowHideButton/ShowHideButton'

import styles from './Matches.scss'
import MatchesByDateSection from './MatchesByDateSection/MatchesByDateSection'
import { useScheduleMatches } from './useScheduleMatches'

const Matches = ({ grid }) => {
  const sortedByDateGridMatches = useScheduleMatches(grid)

  const {
    ref,
    toggleOpenMatchesList,
    isMatchesListOpened,
    gridMatches,
  } = useMatchListShowHideButton(sortedByDateGridMatches)

  if (!grid) return null

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
          <MatchesByDateSection
            key={matchesByDate?.matches?.[0]?.id}
            matchesByDate={matchesByDate}
          />
        ))}

        {gridMatches.length === 0 && <InitialPreloader />}
      </div>

      <ShowHideButton
        isOpened={isMatchesListOpened}
        handleClick={toggleOpenMatchesList}
      />
    </>
  )
}

Matches.propTypes = {
  grid: PropTypes.shape({}),
}

Matches.defaultProps = {
  grid: {},
}

export default React.memo(Matches)
