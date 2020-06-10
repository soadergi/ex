import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import container from 'weplay-competitive/pages/MatchPage/MatchHeader/LobbyLink/container'

import styles from './styles.scss'


const LobbyLink = ({
  // required props
  icon,
  // container props
  text,
  lobbyLink,

  // optional props
  className,
}) => (
  <a
    className={classNames(
      styles.link,
      className,
    )}
    href={lobbyLink}
    rel="noreferrer noopener"
    target="_blank"
  >
    <Icon
      className={classNames(
        styles.icon,
        {
          [styles.discord]: icon === 'discord-contained',
          [styles.spectate]: icon === 'spectate',
        },
      )}
      iconName={icon}
    />
    <span className={styles.text}>
      {text}
    </span>
  </a>
)

LobbyLink.propTypes = {
  // required props
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  // container props
  lobbyLink: PropTypes.string.isRequired,
  // optional props
  className: PropTypes.string,
}

LobbyLink.defaultProps = {
  // optional props
  className: '',
}

export default container(LobbyLink)
