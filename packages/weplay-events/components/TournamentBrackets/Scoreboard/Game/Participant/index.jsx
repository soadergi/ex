import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Avatar from 'weplay-components/Avatar'
import NotificationLabel from 'weplay-components/NotificationLabel'

import styles from './styles.scss'
import container from './container'

const avatarModifications = {
  sm: '48',
  lg: '64',
}

const Participant = ({
  // required props
  coefficient,
  participant,
  isOnline,
  leftSideText,

  // props from container
  i18nTexts,

  // optional props
}) => (
  <div className={classNames(
    styles.user,
    {
      [styles.leftSideText]: leftSideText,
    },
  )}
  >
    <div className={classNames(
      styles.userAvatar,
      {
        [styles.hasCoefficient]: !R.isNil(coefficient),
      },
    )}
    >
      <Avatar
        size="40"
        avatar={participant.picture}
        responsive={avatarModifications}
        isPlaceholderDark
      />

      {isOnline && (
        <NotificationLabel
          isActive
          className={styles.notification}
        />
      )}
    </div>

    <span
      className={classNames(styles.userName,
        { [styles.isActive]: participant.nickname })}
    >
      {participant.nickname || i18nTexts.artifact.player.nickName}
    </span>
  </div>
)

Participant.propTypes = {
  // required props
  participant: PropTypes.shape({
    picture: PropTypes.string,
    nickname: PropTypes.string,
  }).isRequired,
  isOnline: PropTypes.bool.isRequired,
  leftSideText: PropTypes.bool,

  // props from container
  i18nTexts: PropTypes.shape({

  }).isRequired,

  // optional props
  coefficient: PropTypes.number,
}

Participant.defaultProps = {
  coefficient: null,
  // optional props
  leftSideText: false,
}

export default container(Participant)
