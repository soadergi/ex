import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Match from '../Match'
import Connector from '../PlayOffConnector'

import styles from './styles.scss'

const RoundItem = ({
  // required props
  isOdd,
  game,
  isTournamentFinished,

  // container props

  // optional props
  isFinalMatch,
  isThirdPlaceMatchExist,
  isThirdPlaceMatch,
  isCollapsed,
}) => (
  <div
    className={classNames(
      styles.roundItem,
      {
        [styles.isThirdPlaceMatchExist]: isThirdPlaceMatchExist,
        [styles.isCollapsed]: isCollapsed,
      },
    )}
  >
    <div className={styles.game}>
      <Match
        game={game}
        isTournamentFinished={isTournamentFinished}
        isFinalMatch={isFinalMatch}
        isThirdPlaceMatch={isThirdPlaceMatch}
        isThirdPlaceMatchExist={isThirdPlaceMatchExist}
      />
    </div>

    {!isFinalMatch && (
      <Connector
        isOdd={isOdd}
        isCollapsed={isCollapsed}
      />
    )}
  </div>
)

RoundItem.propTypes = {
  // required props
  game: PropTypes.shape({}).isRequired,
  isOdd: PropTypes.bool.isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,

  // container props

  // optional props
  isFinalMatch: PropTypes.bool,
  isThirdPlaceMatch: PropTypes.bool,
  isThirdPlaceMatchExist: PropTypes.bool,
  isCollapsed: PropTypes.bool,
}

RoundItem.defaultProps = {
  // optional props
  isFinalMatch: false,
  isThirdPlaceMatch: false,
  isThirdPlaceMatchExist: false,
  isCollapsed: false,
}

export default RoundItem
