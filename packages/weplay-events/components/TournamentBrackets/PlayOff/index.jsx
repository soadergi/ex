import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import styles from './playOff.scss'
import container from './container'
import Round from './Round'

const PlayOff = ({
  rounds,
  i18nTexts,
  hasExtraRound,
  isTournamentFinished,
}) => (
  <div className={styles.bracket}>
    {hasExtraRound && (
      <Round
        gamePairs={R.pathOr([], ['0', 'gamePairs'], rounds)}
        titleText={i18nTexts.artifact.bracket.oneEighth}
        modifications={['offsetTop']}
        roundIndex={0}
        hasMatchupConnector
        isTournamentFinished={isTournamentFinished}
      />
    )}


    {rounds.slice(hasExtraRound ? 1 : 0).map((round, roundIndex) => (
      <Round
        gamePairs={round.gamePairs}
        roundIndex={roundIndex}
        titleText={i18nTexts.artifact.bracket[round.name]}
        hasConnector={round.name !== '1'}
        isFinal={round.name === '1'}
        key={round.name}
        isTournamentFinished={isTournamentFinished}
      />
    ))}
  </div>
)

PlayOff.propTypes = {
  rounds: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    gamePairs: PropTypes.array.isRequired,
  })).isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  hasExtraRound: PropTypes.bool.isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,
}

export default container(PlayOff)
