import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'

import RoundItem from '../RoundItem'

import styles from './styles.scss'

const Round = ({
  // required props
  isTournamentFinished,
  games,
  roundStatus,
  // container props

  // optional props
  isFinal,
  isCollapsed,
  isThirdPlaceMatchExist,
}) => (
  <div
    className={classNames(
      styles.round,
      {
        [styles.isCollapsed]: isCollapsed,
        [styles.isOngoing]: roundStatus === MATCH_STATUSES.ONGOING,
        [styles.isThirdPlaceMatchExist]: isThirdPlaceMatchExist,
      },
    )}
  >
    {games.map((game, idx) => (
      <RoundItem
        key={game.id}
        game={game}
        isOdd={idx % 2 !== 0}
        isTournamentFinished={isTournamentFinished}
        isFinalMatch={isFinal}
        isThirdPlaceMatch={game.isThirdPlaceMatch}
        isThirdPlaceMatchExist={isThirdPlaceMatchExist && idx === 0}
        isCollapsed={isCollapsed}
      />
    ))}
  </div>
)

Round.propTypes = {
  // required props
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,
  roundStatus: PropTypes.string.isRequired,
  // container

  // optional props
  isFinal: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  isThirdPlaceMatchExist: PropTypes.bool,
}

Round.defaultProps = {
  isFinal: false,
  isCollapsed: false,
  isThirdPlaceMatchExist: false,
}

export default Round
