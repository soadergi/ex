import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Participant from 'weplay-events/components/Participant'
import playerPropType from 'weplay-events/customPropTypes/playerPropType'

import container from './container'
import styles from './styles.scss'
import PlayerInfo from './PlayerInfo'
import PlayerToggle from './PlayerToggle'

const participantModifiers = ['inverted']

const PlayerCard = ({
  // required props
  player,
  isExpanded,
  toggleExpanded,
  tournamentTitle,

  // props from container
  isPlayerToggleVisible,

  // optional props
}) => (
  <div className={classNames(
    styles.block,
    { [styles.isExpanded]: isExpanded },
  )}
  >
    <div
      className={styles.header}
    >
      <Participant
        nickname={player.nickname}
        pictureUrl={player.picture}
        isInvited={player.inviteStatus}
        countryUrl={player.country?.url}
        countryName={player.country?.name}
        modifiers={participantModifiers}
        isAutoChess
      />

      {isPlayerToggleVisible && (
        <div className={styles.info}>
          <PlayerToggle
            handleClick={toggleExpanded}
            isExpanded={isExpanded}
          />
        </div>
      )}
    </div>

    {isExpanded && (
      <div className={styles.body}>
        <PlayerInfo
          tournamentTitle={tournamentTitle}
          player={player}
        />
      </div>
    )}
  </div>
)

PlayerCard.propTypes = {
  // required props
  player: playerPropType.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  tournamentTitle: PropTypes.string.isRequired,

  // container props
  isExpanded: PropTypes.bool,
  isPlayerToggleVisible: PropTypes.bool.isRequired,

  // optional props
}

PlayerCard.defaultProps = {
  isExpanded: false,
}

export default container(PlayerCard)
