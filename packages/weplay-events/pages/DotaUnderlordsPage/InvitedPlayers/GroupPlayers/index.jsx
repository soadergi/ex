import React from 'react'
import PropTypes from 'prop-types'
import PlayerCard from 'weplay-events/components/PlayerCard'
import SectionHeader from 'weplay-components/SectionHeader'

import styles from './styles.scss'
import container from './container'

export const GroupPlayers = ({
  // required props
  group,
  tournamentTitle,

  // container props
  isMobileWidth,

  // optional props
}) => (
  <div className={styles.block}>
    <SectionHeader
      title={group.name}
    />

    <div className={styles.grid}>
      {group.players.map((player, index) => (
        <div
          key={player.uuid}
          className={styles.gridItem}
        >
          <PlayerCard
            tournamentTitle={tournamentTitle}
            player={player}
            isInitiallyExpanded={isMobileWidth && (index === 0)}
          />
        </div>
      ))}
    </div>
  </div>

)

GroupPlayers.propTypes = {
  // required props
  tournamentTitle: PropTypes.string.isRequired,
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
      uuid: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,

  // container props
  isMobileWidth: PropTypes.bool.isRequired,

  // optional props
}

GroupPlayers.defaultProps = {
  // optional props
}

export default container(GroupPlayers)
