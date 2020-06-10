import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Avatar from 'weplay-components/Avatar'
import getIsCaptain from 'weplay-events/pages/EventPage/helpers/getIsCaptain'

import styles from './styles.scss'

const TeamMembersPreviewsList = ({
  players,
  isHidden,
}) => (
  <ul className={classNames(
    styles.block,
    { [styles.isHidden]: isHidden },
  )}
  >
    {players.map(player => (
      <li
        key={player.id}
        className={classNames(
          styles.player,
          { [styles.isCaptain]: getIsCaptain(player) },
        )}
      >
        <Avatar
          avatar={player.logoUrl}
          className={styles.preview}
          isPlaceholderDark
        />
      </li>
    ))}
  </ul>
)

TeamMembersPreviewsList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isHidden: PropTypes.bool.isRequired,
}
export default TeamMembersPreviewsList
