import React, { Fragment, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import playerPropType from 'weplay-events/customPropTypes/playerPropType'

import Participant from '../Participant'
import TeamMember from '../TeamMember'

import styles from './styles.scss'

const TeamMembers = ({
  players,
}) => {
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const sortedPlayers = useMemo(
    () => players.reduce((acc, player) => {
      if (player.teamPosition === 'captain') {
        return [player, ...acc]
      }
      return [...acc, player]
    }, []),
    [players],
  )
  const [activePlayer, setActivePlayer] = useState(sortedPlayers[0])

  return (
    <div className={styles.block}>
      <div className={styles.listContainer}>
        <ul className={styles.list}>
          {sortedPlayers.map((player) => {
            const isActive = player.id === activePlayer.id

            return (
              <Fragment key={player.id}>
                <li className={styles.listItem}>
                  <Participant
                    player={player}
                    setActivePlayer={setActivePlayer}
                    isActive={isActive}
                  />
                </li>

                {(activePlayer && isMobileWidth && isActive) && (
                <TeamMember
                  player={activePlayer}
                />
                )}
              </Fragment>
            )
          })}
        </ul>
      </div>

      {activePlayer && !isMobileWidth && (
        <TeamMember
          player={activePlayer}
        />
      )}
    </div>
  )
}

TeamMembers.propTypes = {
  players: PropTypes.arrayOf(playerPropType).isRequired,

  // optional props
}

TeamMembers.defaultProps = {
}

export default TeamMembers
