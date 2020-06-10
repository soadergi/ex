import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import RoundItem from './RoundItem'
import styles from './styles'
import container from './container'


const Round = ({
  // required props
  isTournamentFinished,
  games,

  // optional props
  isFinal,
  isExtraRound,
  isShiftedYLvlOne,
  isShiftedYLvlTwo,
  fromGameToWinnerConnector,
  isGrandFinal,
  isWinnerBracket,
  isSingleRound,
  isReverted,
  isSuperFinal,
  hasFinalRound,
  isFullBracket,
  isFullBracketSuperFinal,
  tournamentTitle,
  hasWideRound,
  hasDarkBackground,
  stage3playOff,
  hasBracketNote,
  hasRemoveOffSetTop,
}) => (
  <div
    className={classNames(
      styles.round,
      styles[tournamentTitle],
      {
        [styles.hasRemoveOffSetTop]: hasRemoveOffSetTop && !hasWideRound && !stage3playOff,
        [styles.hasOffsetTop]: isExtraRound,
        [styles.winnersToLosersLvlOne]: isShiftedYLvlOne,
        [styles.winnersToLosersLvlTwo]: isShiftedYLvlTwo,
        [styles.isFinal]: isFinal && !isSingleRound,
        [styles.winnersToWinnersLvlOne]: isWinnerBracket && isShiftedYLvlOne && isGrandFinal,
        [styles.isGrandFinal]: isGrandFinal,
        [styles.superFinal]: isSuperFinal,
        [styles.hasFinalRound]: hasFinalRound,
        [styles.hasWideRound]: hasWideRound,
      },
    )}
  >
    {games.map((game, idx) => (
      <RoundItem
        key={game.id}
        game={game}
        isOdd={idx % 2 !== 0}
        isConnectorRelatedToGame={isExtraRound}
        fromGameToWinnerConnector={fromGameToWinnerConnector}
        isTournamentFinished={isTournamentFinished}
        isFinalMatch={isFinal}
        isFinal={isFinal}
        isReverted={isReverted}
        isGrandFinal={isGrandFinal}
        isWinnerBracket={isWinnerBracket}
        isSuperFinal={isSuperFinal}
        hasFinalRound={hasFinalRound}
        isFullBracket={isFullBracket}
        isFullBracketSuperFinal={isFullBracketSuperFinal}
        isThirdPlaceMatch={game.isThirdPlaceMatch}
        tournamentTitle={tournamentTitle}
        hasWideRound={hasWideRound}
        hasDarkBackground={hasDarkBackground}
        stage3playOff={stage3playOff}
        hasBracketNote={hasBracketNote}
      />
    ))}
  </div>
)

Round.propTypes = {
  // required props
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,
  stage3playOff: PropTypes.bool.isRequired,

  // container

  // optional props
  isFinal: PropTypes.bool,
  isExtraRound: PropTypes.bool,
  isShiftedYLvlOne: PropTypes.bool,
  isShiftedYLvlTwo: PropTypes.bool,
  fromGameToWinnerConnector: PropTypes.bool,
  isGrandFinal: PropTypes.bool,
  isWinnerBracket: PropTypes.bool,
  isFullBracket: PropTypes.bool,
  isSingleRound: PropTypes.bool,
  isReverted: PropTypes.bool,
  isSuperFinal: PropTypes.bool,
  hasFinalRound: PropTypes.bool,
  isFullBracketSuperFinal: PropTypes.bool,
  hasWideRound: PropTypes.bool,
  hasDarkBackground: PropTypes.bool,
  hasRemoveOffSetTop: PropTypes.bool,
  hasBracketNote: PropTypes.bool,
  tournamentTitle: PropTypes.string,
}


Round.defaultProps = {
  isFinal: false,
  isExtraRound: false,
  isShiftedYLvlOne: false,
  isShiftedYLvlTwo: false,
  fromGameToWinnerConnector: false,
  isGrandFinal: false,
  isWinnerBracket: false,
  isSingleRound: false,
  isReverted: false,
  isSuperFinal: false,
  hasFinalRound: false,
  isFullBracket: false,
  isFullBracketSuperFinal: false,
  hasWideRound: false,
  hasDarkBackground: false,
  hasRemoveOffSetTop: false,
  hasBracketNote: false,
  tournamentTitle: '',
}


export default container(Round)
