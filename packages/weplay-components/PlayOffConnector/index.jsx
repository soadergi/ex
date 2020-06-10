import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const Connector = ({
  // required props
  isOdd,

  // container props

  // optional props
  isConnectorRelatedToGame,
  fromGameToWinnerConnector,
  isGrandFinal,
  isTournamentModule,
  className,
  tournamentTitle,
}) => (
  <div className={classNames(
    styles.connector,
    styles[tournamentTitle],
    {
      [styles.isOdd]: isOdd,
      [styles.isRelatedToGame]: isConnectorRelatedToGame,
      [styles.fromGameToWinner]: fromGameToWinnerConnector,
      [styles.isGrandFinal]: isGrandFinal,
      [styles.isTournamentModule]: isTournamentModule,
    },
    className,
  )}
  >
    <div className={styles.path} />
  </div>
)

Connector.propTypes = {
  // required props
  isOdd: PropTypes.bool.isRequired,

  // container props

  // optional props
  isConnectorRelatedToGame: PropTypes.bool,
  fromGameToWinnerConnector: PropTypes.bool,
  isGrandFinal: PropTypes.bool,
  isTournamentModule: PropTypes.bool,
  className: PropTypes.string,
  tournamentTitle: PropTypes.string,
}

Connector.defaultProps = {
  // optional props
  isConnectorRelatedToGame: false,
  fromGameToWinnerConnector: false,
  isGrandFinal: false,
  isTournamentModule: false,
  className: '',
  tournamentTitle: '',
}

export default container(Connector)
