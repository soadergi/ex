import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Connector from 'weplay-components/PlayOffConnector'

import Match from '../../Match'

import container from './container'
import styles from './styles'

const RoundItem = ({
  // required props
  isOdd,
  game,
  isTournamentFinished,

  // container props

  // optional props
  fromGameToWinnerConnector,
  isFinalMatch,
  isConnectorRelatedToGame,
  isReverted,
  isGrandFinal,
  isWinnerBracket,
  isSuperFinal,
  hasFinalRound,
  isFullBracket,
  isFullBracketSuperFinal,
  isThirdPlaceMatch,
  tournamentTitle,
  hasWideRound,
  hasDarkBackground,
  stage3playOff,
  hasBracketNote,
}) => (
  <div
    className={classNames(
      styles.roundItem,
      styles[tournamentTitle],
      {
        [styles.withoutConnector]: isFinalMatch,
        [styles.isGrandFinal]: isGrandFinal && !isWinnerBracket,
        [styles.isThirdPlaceMatch]: isThirdPlaceMatch,
        [styles.hasWideRound]: hasWideRound,
      },
    )}
  >
    <div className={styles.game}>
      <Match
        game={game}
        isTournamentFinished={isTournamentFinished}
        isFinalMatch={isFinalMatch}
        isGrandFinal={isGrandFinal}
        isReverted={isReverted}
        isSuperFinal={isSuperFinal}
        hasFinalRound={hasFinalRound}
        isWinnerBracket={isWinnerBracket}
        isFullBracket={isFullBracket}
        isFullBracketSuperFinal={isFullBracketSuperFinal}
        isThirdPlaceMatch={isThirdPlaceMatch}
        tournamentTitle={tournamentTitle}
        hasDarkBackground={hasDarkBackground}
        stage3playOff={stage3playOff}
        hasBracketNote={hasBracketNote}
      />
    </div>

    {((!hasWideRound && !isFinalMatch) || (isFinalMatch && isGrandFinal && !isWinnerBracket)) && (
      <Connector
        isOdd={isOdd}
        fromGameToWinnerConnector={fromGameToWinnerConnector}
        isConnectorRelatedToGame={isConnectorRelatedToGame}
        isFinalMatch={isFinalMatch}
        isGrandFinal={isGrandFinal}
        isTournamentModule={false}
        className={styles.connector}
        tournamentTitle={tournamentTitle}
      />
    )}
  </div>
)

RoundItem.propTypes = {
  // required props
  game: PropTypes.shape({}).isRequired,
  isOdd: PropTypes.bool.isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,
  stage3playOff: PropTypes.bool.isRequired,

  // container props

  // optional props
  fromGameToWinnerConnector: PropTypes.bool,
  isConnectorRelatedToGame: PropTypes.bool,
  isFinalMatch: PropTypes.bool,
  isReverted: PropTypes.bool,
  isGrandFinal: PropTypes.bool,
  isWinnerBracket: PropTypes.bool,
  isSuperFinal: PropTypes.bool,
  hasFinalRound: PropTypes.bool,
  isFullBracket: PropTypes.bool,
  isFullBracketSuperFinal: PropTypes.bool,
  isThirdPlaceMatch: PropTypes.bool,
  tournamentTitle: PropTypes.string,
  hasWideRound: PropTypes.bool,
  hasDarkBackground: PropTypes.bool,
  hasBracketNote: PropTypes.bool,
}

RoundItem.defaultProps = {
  // optional props
  fromGameToWinnerConnector: false,
  isConnectorRelatedToGame: false,
  isFinalMatch: false,
  isReverted: false,
  isGrandFinal: false,
  isWinnerBracket: false,
  isSuperFinal: false,
  hasFinalRound: false,
  isFullBracket: false,
  isFullBracketSuperFinal: false,
  isThirdPlaceMatch: false,
  hasWideRound: false,
  hasDarkBackground: false,
  hasBracketNote: false,
  tournamentTitle: '',
}

export default container(RoundItem)
