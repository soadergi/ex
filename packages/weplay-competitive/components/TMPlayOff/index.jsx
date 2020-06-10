import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import className from 'classnames'

import { ActiveParticipantContext } from './active-participant-context'
import Round from './Round'
import styles from './styles.scss'
import container from './container'

const TMPlayOff = ({
  // required props
  rounds,
  isTournamentFinished,
  getRoundStatus,

  // container props
  lastRoundIndex,
  createInnerRef,
  mouseDownHandler,
  mouseLeaveHandler,
  mouseUpHandler,
  mouseMoveHandler,
  scrollHandler,
  isMouseDown,

  participantContext,
  // optional props
  isCollapsed,
}) => (
  <div
    className={className(
      styles.playoff,
      {
        [styles.isMouseDown]: isMouseDown,
      },
    )}
    ref={createInnerRef}
    onMouseDown={mouseDownHandler}
    onMouseLeave={mouseLeaveHandler}
    onMouseUp={mouseUpHandler}
    onMouseMove={mouseMoveHandler}
    onScroll={scrollHandler}
  >
    <div className={styles.grid}>
      <ActiveParticipantContext.Provider value={participantContext}>
        {rounds.map((round, index) => (
          <Round
            key={round.games[0].id}
            games={round.games}
            isTournamentFinished={isTournamentFinished}
            isFinal={index === lastRoundIndex}
            roundStatus={getRoundStatus(round)}
            round={round}
            isThirdPlaceMatchExist={
              R.pipe(
                R.propOr({}, 'games'),
                R.last,
                R.propOr(false, 'isThirdPlaceMatch'),
              )(round)
            }
            isCollapsed={isCollapsed}
          />
        ))}
      </ActiveParticipantContext.Provider>
    </div>
  </div>
)

TMPlayOff.propTypes = {
  // required props
  rounds: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,
  getRoundStatus: PropTypes.func.isRequired,

  // container props
  lastRoundIndex: PropTypes.number.isRequired,
  createInnerRef: PropTypes.func.isRequired,
  mouseDownHandler: PropTypes.func.isRequired,
  mouseLeaveHandler: PropTypes.func.isRequired,
  mouseUpHandler: PropTypes.func.isRequired,
  mouseMoveHandler: PropTypes.func.isRequired,
  scrollHandler: PropTypes.func.isRequired,
  isMouseDown: PropTypes.bool.isRequired,

  participantContext: PropTypes.shape({}).isRequired,

  // optional props
  isCollapsed: PropTypes.bool,
}

TMPlayOff.defaultProps = {
  isCollapsed: false,
}

export default container(TMPlayOff)
