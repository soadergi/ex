import React from 'react'
import classNames from 'classnames'
import Avatar from 'weplay-components/Avatar'
import Tip from 'weplay-components/Tip'
import gamePropType from 'weplay-competitive/customPropTypes/gamePropType'
import gameModePropType from 'weplay-competitive/customPropTypes/gameModePropType'

import styles from '../styles.scss'

const TournamentGame = ({
  // required props
  tournamentGame,
  gameMode,
}) => (
  <div className={styles.header}>
    <Avatar
      avatar={tournamentGame.logo}
      className={styles.gamePreview}
      size="40"
    />
    <div>
      <span className={classNames(
        styles.title,
        styles.smallText,
      )}
      >
        {tournamentGame.name}
      </span>
      {gameMode.isFetched && (
        <Tip>{gameMode.title}</Tip>
      )}
    </div>
  </div>

)

TournamentGame.propTypes = {
  // required props
  gameMode: gameModePropType.isRequired,
  tournamentGame: gamePropType.isRequired,
}

export default TournamentGame
