import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import SvgIcon from '../SvgIcon'

import container from './container'
import styles from './styles'

const RoundsLabels = ({
  // required props
  rounds,

  // container props

  // optional props
  isReverted,
  hasGrandFinal,
  isSingleRound,
  isSuperFinal,
  finalRoundIndex,
  isTournamentModule,
  isFullBracketSuperFinal,
  tournamentTitle,
  hasWideRound,
}) => (
  <div
    className={classNames(
      styles.labels,
      styles[tournamentTitle],
      {
        [styles.isReverted]: isReverted,
        [styles.hasGrandFinal]: isSingleRound,
        [styles.superFinal]: isSuperFinal,
        [styles.hasFinalRound]: finalRoundIndex,
        [styles.isTournamentModule]: isTournamentModule,
        [styles.fullBracketSuperFinal]: isFullBracketSuperFinal,
      },
    )}
  >
    {rounds.map((round, index) => round.label && (
      <p
        className={classNames(
          styles.label,
          styles[tournamentTitle],
          {
            [styles.superFinal]: isSuperFinal,
            [styles.hasFinalRound]: finalRoundIndex === index,
            [styles.isTournamentModule]: isTournamentModule,
            [styles.fullBracketSuperFinal]: isFullBracketSuperFinal,
            [styles.hasWideRound]: hasWideRound && index === 1,
          },
        )}
        key={round.label}
      >
        {((finalRoundIndex || isSuperFinal || hasGrandFinal) && index === rounds.length - 1) && (
          <SvgIcon
            iconName="goldCup"
            type="color"
            className={styles.icon}
          />
        )}

        {round.label}
      </p>
    ))}
  </div>
)

RoundsLabels.propTypes = {
  // required props
  rounds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
  })).isRequired,

  // container props

  // optional props
  isReverted: PropTypes.bool,
  hasGrandFinal: PropTypes.bool,
  isSingleRound: PropTypes.bool,
  isSuperFinal: PropTypes.bool,
  finalRoundIndex: PropTypes.number,
  isTournamentModule: PropTypes.bool,
  isFullBracketSuperFinal: PropTypes.bool,
  tournamentTitle: PropTypes.string,
  hasWideRound: PropTypes.bool,
}

RoundsLabels.defaultProps = {
  isReverted: false,
  hasGrandFinal: false,
  isSingleRound: false,
  isSuperFinal: false,
  finalRoundIndex: null,
  isTournamentModule: false,
  isFullBracketSuperFinal: false,
  tournamentTitle: '',
  hasWideRound: false,
}

export default container(RoundsLabels)
