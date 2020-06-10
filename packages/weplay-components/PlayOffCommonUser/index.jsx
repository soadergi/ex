import * as R from 'ramda'
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import SvgIcon from '../SvgIcon'
import UserAvatar from '../UserAvatar'

import styles from './styles.scss'
import container from './container'

const PlayOffCommonUser = ({
  participant,
  isInvited,
  i18nTexts,
  isHovered,
  hasDarkBackground,
}) => (
  <div
    className={classNames(
      styles.user,
      { [styles.hasDarkBackground]: hasDarkBackground },
    )}
  >
    <div className={styles.userAvatar}>
      <UserAvatar
        className={styles.avatar}
        hasDarkBackground={hasDarkBackground}
        avatar={participant.picture}
        isPremiumAccount={participant.isPremiumAccount}
        size="40"
      />

      {(isInvited && participant.nickname) && (
        <div className={styles.invited}>
          <SvgIcon
            iconName="gold-star"
            type="color"
          />
        </div>
      )}
    </div>

    <span className={classNames(
      styles.name,
      {
        [styles.isActive]: !R.isNil(participant.nickname),
        [styles.isHovered]: isHovered,
        'u-text-medium': isInvited && participant.nickname,
      },
    )}
    >
      {participant.nickname || i18nTexts.tba}
    </span>
  </div>
)

PlayOffCommonUser.propTypes = {
  isInvited: PropTypes.bool,
  isHovered: PropTypes.bool,
  participant: PropTypes.shape({
    uuid: PropTypes.string,
    score: PropTypes.number,
    nickname: PropTypes.string,
    isPremiumAccount: PropTypes.bool,
    picture: PropTypes.string,
  }).isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  hasDarkBackground: PropTypes.bool,
}

PlayOffCommonUser.defaultProps = {
  isInvited: false,
  isHovered: false,
  hasDarkBackground: false,
}

export default container(PlayOffCommonUser)
