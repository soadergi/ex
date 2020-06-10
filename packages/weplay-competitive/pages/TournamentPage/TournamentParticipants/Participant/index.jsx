import React from 'react'
import PropTypes from 'prop-types'
import UserAvatar from 'weplay-components/UserAvatar'
import Link from 'weplay-components/Link'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/gameModeTypes'
import gameModePropType from 'weplay-competitive/customPropTypes/gameModePropType'
import { AT__TEAM_DETAILS, AT__USER_DETAILS } from 'weplay-competitive/analytics/amplitude'

import styles from './styles.scss'
import container from './container'

const Participant = ({
  // required props
  avatar,
  name,
  link,
  linkText,
  handleClickAvatarOrName,
  handleClickProfileLink,
  // container props
  gameMode,
  discipline,
  // optional props
  isPremiumAccount,
}) => (
  <div className={styles.participant}>
    <Link
      to={link}
      target="_blank"
      className={styles.left}
      onClick={handleClickAvatarOrName}
      {...getAnalyticsAttributes({
        'amplitude-action': gameMode.gameModeType === GAME_MODE_TYPES.SINGLE
          ? AT__USER_DETAILS
          : AT__TEAM_DETAILS,
        'amplitude-discipline': discipline,
        'amplitude-source': LOOKUP,
      })}
    >
      <UserAvatar
        avatar={avatar}
        className={styles.avatar}
        isPremiumAccount={isPremiumAccount}
      />
      <span className={styles.name}>{name}</span>
    </Link>
    <Link
      to={link}
      target="_blank"
      className={styles.link}
      onClick={handleClickProfileLink}
      {...getAnalyticsAttributes({
        'amplitude-action': gameMode.gameModeType === GAME_MODE_TYPES.SINGLE
          ? AT__USER_DETAILS
          : AT__TEAM_DETAILS,
        'amplitude-discipline': discipline,
        'amplitude-source': LOOKUP,
      })}
    >
      {linkText}
    </Link>
  </div>

)

Participant.propTypes = {
  // required props
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  // container props
  handleClickAvatarOrName: PropTypes.func.isRequired,
  handleClickProfileLink: PropTypes.func.isRequired,
  gameMode: gameModePropType.isRequired,
  discipline: PropTypes.string.isRequired,
  // optional props
  avatar: imgPropType,
  isPremiumAccount: PropTypes.bool,
}

Participant.defaultProps = {
  // optional props
  avatar: '',
  isPremiumAccount: false,
}

export default container(Participant)
