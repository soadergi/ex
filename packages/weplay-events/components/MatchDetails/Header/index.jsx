import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Avatar from 'weplay-components/Avatar'

import placeholder from './img/gamer-avatar.jpg'
import container from './container'
import styles from './styles.scss'

const Header = ({
  participantA,
  participantB,
}) => (
  <div
    className={classNames(
      styles.block,
    )}
  >
    <div
      className={classNames(
        styles.participant,
      )}
    >
      <Avatar
        className={styles.avatar}
        avatar={participantA.picture || placeholder}
      />
      <span className={styles.nickname}>
        {participantA.nickname}
      </span>
    </div>

    {' - '}

    <div
      className={classNames(
        styles.participant,
      )}
    >
      <Avatar
        className={styles.avatar}
        avatar={participantB.picture || placeholder}
      />
      <span className={styles.nickname}>
        {participantB.nickname}
      </span>
    </div>
  </div>

)

Header.propTypes = {
  // required props
  participantA: PropTypes.shape({
    picture: PropTypes.string,
    nickname: PropTypes.string,
  }).isRequired,
  participantB: PropTypes.shape({
    picture: PropTypes.string,
    nickname: PropTypes.string,
  }).isRequired,
  // container props

  // optional props
}

Header.defaultProps = {
  // optional props
}

export default container(Header)
