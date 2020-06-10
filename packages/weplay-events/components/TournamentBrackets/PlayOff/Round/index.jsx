import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Matchup from '../Matchup'

import styles from './round.scss'
import container from './container'


const Round = ({
  // required props
  gamePairs,
  roundIndex,
  isTournamentFinished,

  // optional props
  hasMatchupConnector,
  hasConnector,
  isFinal,
  modifications,
}) => (
  <section className={classNames(
    styles.round,
    styles[`round-${roundIndex}`],
    modifications.map(modification => styles[modification]),
  )}
  >
    {gamePairs.map(gamePair => (
      <div
        className={styles.winners}
        key={gamePair[0].startDatetime}
      >
        <div className={styles.matchups}>
          {gamePair.map(game => (
            <Matchup
              game={game}
              className={styles.matchup}
              isFinalMatchup={isFinal}
              key={game.startDatetime}
              hasConnector={hasMatchupConnector}
              matchTitle={`Match #${game.matchNumber}`}
              isTournamentFinished={isTournamentFinished}
            />
          ))}
        </div>
        {hasConnector && (
          <div className={styles.connector}>
            <div className={styles.merger} />
            <div className={styles.line} />
          </div>
        )}
      </div>
    ))}
  </section>
)

Round.propTypes = {
  // required props
  gamePairs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  roundIndex: PropTypes.number.isRequired,

  // optional props
  hasMatchupConnector: PropTypes.bool,
  hasConnector: PropTypes.bool,
  isFinal: PropTypes.bool,
  modifications: PropTypes.arrayOf(PropTypes.string),
  isTournamentFinished: PropTypes.bool.isRequired,
}


Round.defaultProps = {
  hasMatchupConnector: false,
  hasConnector: false,
  isFinal: false,
  modifications: [],
}


export default container(Round)
