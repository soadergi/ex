import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import UserAvatar from 'weplay-components/UserAvatar'

import styles from './styles.scss'

const PlayOffCommonUser = ({
  hasCoefficient,
  nickname,
  participant,
}) => (
  <div
    className={classNames(
      styles.block,
      { [styles.hasCoefficient]: hasCoefficient },
    )}
  >
    <div className={styles.userAvatar}>
      <UserAvatar
        className={styles.avatar}
        avatar={participant.logo}
        size="32"
      />
    </div>

    <span className={styles.name}>
      {nickname}
    </span>
  </div>
)

PlayOffCommonUser.propTypes = {
  participant: PropTypes.shape({
    uuid: PropTypes.string,
    score: PropTypes.number,
    nickname: PropTypes.string,
    isPremiumAccount: PropTypes.bool,
    logo: PropTypes.string,
  }).isRequired,
  hasCoefficient: PropTypes.bool,
  nickname: PropTypes.string,
}

PlayOffCommonUser.defaultProps = {
  nickname: '',
  hasCoefficient: false,
}

export default PlayOffCommonUser
