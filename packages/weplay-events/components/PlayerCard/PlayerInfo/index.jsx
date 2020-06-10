import React from 'react'
import PropTypes from 'prop-types'
import { SocialLinksMarkup } from 'weplay-components/SocialLinks'

import container from './container'
import styles from './styles.scss'

const socialLinksModifiers = ['grey', 'teamMember']

const PlayerInfo = ({
  // required props
  player,

  // props from container
  playerSocials,
  i18nTexts,

  // optional props
  tournamentTitle,
}) => (
  <div className={styles.block}>
    {player.name && (
      <>
        <p className={styles.label}>
          {i18nTexts.tournamentStages.invitedTeams.name}
        </p>
        <p className={styles.text}>{player.name}</p>
      </>
    )}

    {player.team && (
      <>
        <p className={styles.label}>
          {i18nTexts.tournamentStages.invitedTeams.team}
        </p>
        <p className={styles.text}>{player.team}</p>
      </>
    )}

    <SocialLinksMarkup
      tournamentTitle={tournamentTitle}
      links={playerSocials}
      modifiers={socialLinksModifiers}
    />
  </div>
)

PlayerInfo.propTypes = {
  // required props
  player: PropTypes.shape({}).isRequired,

  // props from container
  i18nTexts: PropTypes.shape({}).isRequired,
  playerSocials: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    path: PropTypes.string,
  })).isRequired,

  // optional props
  tournamentTitle: PropTypes.string,
}

PlayerInfo.defaultProps = {
  tournamentTitle: '',
}

export default container(PlayerInfo)
