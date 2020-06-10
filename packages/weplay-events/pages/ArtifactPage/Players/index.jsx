import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import SectionHeader from 'weplay-components/SectionHeader'

import Player from './Player/index'
import container from './container'
import styles from './styles.scss'

const Players = ({
  i18nTexts,
  players,
  stageTitle,
}) => (
  <Fragment>
    <SectionHeader
      title={i18nTexts.artifact.invitedPlayers}
    />

    <div className={styles.fourItemGrid}>
      {players.map(player => (
        <Player
          key={player.uuid}
          i18nTexts={i18nTexts}
          player={player}
          stageTitle={stageTitle}
        />
      ))}
    </div>
  </Fragment>
)


Players.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  stageTitle: PropTypes.string.isRequired,
}

export default container(Players)
