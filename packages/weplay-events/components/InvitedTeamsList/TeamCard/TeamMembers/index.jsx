import React from 'react'
import PropTypes from 'prop-types'
import Participant from 'weplay-events/components/Participant'

import TeamMember from '../TeamMember'

import container from './container'
import styles from './styles.scss'

const TeamMembers = ({
  // required props
  sortedPlayers,
  activePlayer,
  setActivePlayer,
  isCaptainWithRole,

  // props from container
  getPlayerModifiers,

  // optional props
}) => (
  <div className={styles.block}>
    <div className={styles.listContainer}>
      <ul className={styles.list}>
        {sortedPlayers.map(player => (
          <li
            key={player.uuid}
            className={styles.listItem}
          >
            <div onClick={() => setActivePlayer(player)}>
              <Participant
                nickname={player.nickname}
                pictureUrl={player.picture}
                modifiers={getPlayerModifiers(player)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>

    <TeamMember
      player={activePlayer}
      isCaptainWithRole={isCaptainWithRole}
    />
  </div>
)

TeamMembers.propTypes = {
  // required props
  sortedPlayers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activePlayer: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  setActivePlayer: PropTypes.func.isRequired,
  isCaptainWithRole: PropTypes.bool.isRequired,

  // container props
  getPlayerModifiers: PropTypes.func.isRequired,

  // optional props
}

TeamMembers.defaultProps = {
}

export default container(TeamMembers)
