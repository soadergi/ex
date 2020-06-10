import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import UserAvatar from 'weplay-components/UserAvatar'

import styles from './styles.scss'

const PlayOffUser = ({
  participant,
  isCurrentUser,
}) => {
  const t = useTranslation()
  return (
    <div className={className(
      styles.user,
      {
        // TODO: @Roman Bogdanov add current user
        [styles.isCurrentUser]: isCurrentUser,
      },
    )}
    >
      <UserAvatar
        avatar={participant.picture}
        isPremiumAccount={participant.isPremiumAccount}
        size="24"
      />
      <span className={styles.name}>
        {participant.nickname || t('tba')}
      </span>
    </div>
  )
}

PlayOffUser.propTypes = {
  participant: PropTypes.shape({
    uuid: PropTypes.string,
    score: PropTypes.number,
    nickname: PropTypes.string,
    isPremiumAccount: PropTypes.bool,
    picture: PropTypes.string,
  }).isRequired,
  isCurrentUser: PropTypes.bool,
}

PlayOffUser.defaultProps = {
  isCurrentUser: false,
}

export default PlayOffUser
