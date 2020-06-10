import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import routeInfoPropType from 'weplay-core/customPropTypes/routeInfoPropType'
import RoundsLabels from 'weplay-components/RoundsLabels'
import SvgIcon from 'weplay-components/SvgIcon'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { playoffRoundPropType } from 'weplay-events/customPropTypes'

import Round from './Round'
import styles from './styles.scss'
import container from './container'

const second = 2
const EventsPlayOff = ({
  // required props
  rounds,
  isTournamentFinished,

  // container props
  routeInfo,
  hasFirstExtraRound,
  doubleRoundIndexes,
  lastRoundIndex,

  isReverted,
  isWinnerBracket,
  isFullBracket,
  hasGrandFinal,
  isSingleRound,
  hasPlayoffConnector,
  isSuperFinal,
  finalRoundIndex,
  isFullBracketSuperFinal,
  tournamentTitle,
  hasWideRound,
  stage3playOff,
  hasRemoveOffSetTop,
  hasBracketNote,
}) => {
  const t = useTranslation()

  return (
    <div className={classNames(
      styles.playoff,
      styles[tournamentTitle],
      {
        [styles.hasGrandFinal]: hasGrandFinal && isSingleRound,
        [styles.hasConnector]: hasPlayoffConnector,
        [styles.superFinal]: isSuperFinal,
        [styles.hasFinalRound]: finalRoundIndex,
        [styles.fullBracketSuperFinal]: isSuperFinal && isFullBracketSuperFinal,
      },
    )}
    >
      <RoundsLabels
        rounds={rounds}
        hasGrandFinal={hasGrandFinal}
        isSingleRound={isSingleRound}
        isSuperFinal={isSuperFinal}
        finalRoundIndex={finalRoundIndex}
        isTournamentModule={false}
        isReverted={isReverted}
        isFullBracketSuperFinal={isFullBracketSuperFinal}
        tournamentTitle={tournamentTitle}
        hasWideRound={hasWideRound}
      />
      <div
        className={classNames(
          styles.grid,
          {
            [styles.isReverted]: isReverted,
            [styles.superFinal]: isSuperFinal,
            [styles.hasFinalRound]: finalRoundIndex,
          },
        )}
      >
        {rounds.map((round, index) => (
          <Round
            key={round.games[0].id}
            games={round.games}
            hasWideRound={hasWideRound && index === 1}
            hasDarkBackground={hasWideRound}
            stage3playOff={stage3playOff}
            isTournamentFinished={isTournamentFinished}
            isExtraRound={index === 0 && hasFirstExtraRound}
            isShiftedYLvlOne={index >= doubleRoundIndexes[1]}
            isShiftedYLvlTwo={index >= doubleRoundIndexes[second]}
            fromGameToWinnerConnector={
              (index + 1 === doubleRoundIndexes[1] || index + 1 === doubleRoundIndexes[second])
              || (hasGrandFinal && index === lastRoundIndex - 1)
            }
            isFinal={index === lastRoundIndex}
            isSingleRound={isSingleRound}
            isReverted={isReverted}
            isGrandFinal={hasGrandFinal && index === lastRoundIndex}
            isWinnerBracket={isWinnerBracket}
            isSuperFinal={isSuperFinal}
            hasFinalRound={finalRoundIndex === index}
            isFullBracket={isFullBracket}
            isFullBracketSuperFinal={isFullBracketSuperFinal}
            tournamentTitle={tournamentTitle}
            hasRemoveOffSetTop={hasRemoveOffSetTop}
            hasBracketNote={hasBracketNote}
          />
        ))}
      </div>

      {hasBracketNote && (
        <p className={styles.note}>
          <SvgIcon
            className={styles.iconNote}
            iconName={stage3playOff ? 'invite' : 'goldCup'}
            type="color"
          />
          {' — '}
          {t(`events.${routeInfo.title}.tournamentBracket.${stage3playOff
            ? 'firstAndSecondStage'
            : 'secondStage.semifinals'}`)}
        </p>
      )}
    </div>
  )
}

EventsPlayOff.propTypes = {
  // required props
  rounds: playoffRoundPropType.isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,

  // container props
  routeInfo: routeInfoPropType.isRequired,
  hasFirstExtraRound: PropTypes.bool,
  doubleRoundIndexes: PropTypes.arrayOf(PropTypes.number).isRequired,
  lastRoundIndex: PropTypes.number.isRequired,

  // optional props
  stage3playOff: PropTypes.bool,
  isWinnerBracket: PropTypes.bool,
  isFullBracket: PropTypes.bool,
  isReverted: PropTypes.bool,
  hasGrandFinal: PropTypes.bool,
  isSingleRound: PropTypes.bool,
  hasPlayoffConnector: PropTypes.bool,
  isSuperFinal: PropTypes.bool,
  finalRoundIndex: PropTypes.number,
  isFullBracketSuperFinal: PropTypes.bool,
  tournamentTitle: PropTypes.string,
  hasWideRound: PropTypes.bool,
  hasRemoveOffSetTop: PropTypes.bool,
  hasBracketNote: PropTypes.bool,
}

EventsPlayOff.defaultProps = {
  isReverted: false,
  isWinnerBracket: false,
  hasFirstExtraRound: false,
  hasGrandFinal: false,
  isSingleRound: false,
  hasPlayoffConnector: false,
  isSuperFinal: false,
  finalRoundIndex: null,
  isFullBracketSuperFinal: false,
  isFullBracket: false,
  tournamentTitle: '',
  hasWideRound: false,
  hasRemoveOffSetTop: false,
  hasBracketNote: false,
  stage3playOff: false,
}

export default container(EventsPlayOff)
