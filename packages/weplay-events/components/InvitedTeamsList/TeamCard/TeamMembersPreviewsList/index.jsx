import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Avatar from 'weplay-components/Avatar'

import container from './container'
import styles from './styles.scss'

const TeamMembersPreviewsList = ({
  // required props
  sortedPlayers,

  // container props

  // optional props
  isHidden,
}) => (
  <ul className={classNames(
    styles.block,
    { [styles.isHidden]: isHidden },
  )}
  >
    {sortedPlayers.map(player => (
      <li
        key={player.uuid}
        className={classNames(
          styles.player,
          { [styles.isCaptain]: player.isCaptain },
        )}
      >
        <Avatar
          avatar={player.picture}
          className={styles.preview}
          isPlaceholderDark
        />
      </li>
    ))}
  </ul>
)

TeamMembersPreviewsList.propTypes = {
  // required props
  sortedPlayers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  // container props

  // optional props
  isHidden: PropTypes.bool,
}

TeamMembersPreviewsList.defaultProps = {
  isHidden: false,
}

export default container(TeamMembersPreviewsList)
