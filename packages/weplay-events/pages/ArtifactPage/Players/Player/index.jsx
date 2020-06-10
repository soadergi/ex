import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SvgIcon from 'weplay-components/SvgIcon'
import Image from 'weplay-components/Image'

import container from './container'
import styles from './styles.scss'

const Player = ({
  player,
  stageTitle,
  playerSocials,
}) => (
  <div className={classNames(styles.player, styles[stageTitle])}>
    <div className={styles.playerWrapper}>
      <div className={styles.playerAvatar}>
        <Image
          className={styles.playerAvatarImage}
          src={player.picture}
          alt=""
        />
        <span className={styles.playerFlag}>
          <Image
            className={styles.playerFlagImage}
            src={player.country.url}
            alt=""
          />
        </span>
      </div>
      <div className={styles.playerInformation}>
        <div className={styles.playerInformationTop}>
          <div className={styles.playerNickName}>{player.nickname}</div>
          <div className={styles.playerName}>{player.name}</div>
          <ul className={styles.playerSocials}>
            {playerSocials.map(([key, value]) => (
              value && (
              <li
                className={styles.playerSocialsItem}
                key={value}
              >
                <a
                  href={value}
                  className={classNames(
                    styles.playerSocialsLink,
                    styles[key],
                  )}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <SvgIcon
                    iconName={key}
                    className={styles.playerSocialsIcon}
                  />
                </a>
              </li>
              )
            ))}
          </ul>
        </div>
        <div className={classNames(
          styles.playerInformationBottom,
          { [styles.hasChild]: player.title },
        )}
        >
          <div className={styles.playerTeam}>{player.team}</div>
        </div>
      </div>
    </div>
  </div>
)

Player.propTypes = {
  player: PropTypes.shape({
    picture: PropTypes.string,
    name: PropTypes.string,
    nickname: PropTypes.string,
    title: PropTypes.string,
    team: PropTypes.string,
    country: PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  stageTitle: PropTypes.string.isRequired,
  playerSocials: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
}

export default container(Player)
