import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'
import SvgIcon from 'weplay-components/SvgIcon'
import UserAvatar from 'weplay-components/UserAvatar'
import playerPropType from 'weplay-events/customPropTypes/playerPropType'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'
import { useParticipant } from './container'

const Participant = ({
  player,
  setActivePlayer,
  isActive,
  isInvited,
  children,
}) => {
  const t = useTranslation()

  const {
    handleClick,
    playerRoleLabel,
    modifiers,
    isCaptain,
    playerAvatar,
  } = useParticipant({ player, setActivePlayer, isActive })

  return (
    <div
      onClick={handleClick}
      className={classNames(
        styles.block,
        setCSSModifiers(modifiers, styles),
        { [styles.alignItemsTop]: children },
      )}
    >
      <div className={styles.wrapAvatar}>
        <figure className={styles.avatar}>
          <UserAvatar
            avatar={playerAvatar}
            className={styles.image}
          />
        </figure>

        {isCaptain && (
          <div className={styles.borderArrow}>
            <Icon
              size="small"
              iconName="double-arrow-up"
              className={styles.icon}
            />
          </div>
        )}
      </div>

      <div className={styles.content}>
        <span className={styles.nickname}>
          {player.nickname || t('tba')}
        </span>

        <p className={styles.text}>{playerRoleLabel}</p>
        {children}
      </div>

      {isInvited && (
        <SvgIcon
          iconName="gold-star"
          className={styles.icon}
          type="color"
        />
      )}
    </div>
  )
}

Participant.propTypes = {
  player: playerPropType.isRequired,
  setActivePlayer: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isInvited: PropTypes.bool,
  children: PropTypes.node,
}

Participant.defaultProps = {
  isInvited: false,
  children: null,
}

export default Participant
