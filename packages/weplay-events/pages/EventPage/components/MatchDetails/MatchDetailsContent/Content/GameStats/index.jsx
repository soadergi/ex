import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import { participantPropType } from 'weplay-events/customPropTypes'

import styles from './styles.scss'
import { useGameStats } from './container'
import HeroesPictures from './HeroesPictures'

const GameStats = ({
  gameId,
  participants,
}) => {
  const t = useTranslation()

  const {
    isGameDetails,
    duration,
    allHeroes,
    isRadiantLeft,
    isWinIconRight,
    twitchUrl,
    highlightsUrl,
    newsUrl,
  } = useGameStats({
    gameId,
    participants,
  })

  if (!isGameDetails) return null

  return (
    <div className={styles.block}>
      <div className={styles.leftPart}>
        <p className={styles.roundTime}>{duration}</p>

        <p className={styles.teamSide}>
          {t(`events.matchDetails.bottom.dota.teamSide.${isRadiantLeft ? 'radiant' : 'dire'}`)}

          {!isWinIconRight && (
            <Icon
              className={styles.iconWinner}
              size="small"
              iconName="cup"
            />
          )}
        </p>

        <div className={styles.wrapImages}>
          <HeroesPictures
            allHeroes={allHeroes}
            isRadiantHeroes={isRadiantLeft}
            isDireHeroes={!isRadiantLeft}
          />
        </div>
      </div>

      <div className={styles.rightPart}>
        <div className={styles.wrapLinks}>
          <Link
            className={classNames(
              styles.link,
              { [styles.isDisabled]: !twitchUrl },
            )}
            target={twitchUrl}
            to={twitchUrl || '#'}
          >
            <Icon
              className={styles.iconLink}
              iconName="twitch"
            />
          </Link>

          <Link
            className={classNames(
              styles.link,
              { [styles.isDisabled]: !highlightsUrl },
            )}
            target={highlightsUrl}
            to={highlightsUrl || '#'}
          >
            <Icon
              className={styles.iconLink}
              iconName="youtube"
            />
          </Link>

          <Link
            className={classNames(
              styles.link,
              { [styles.isDisabled]: !newsUrl },
            )}
            target={newsUrl}
            to={newsUrl || '#'}
          >
            <Icon
              className={styles.iconLink}
              iconName="news"
            />
          </Link>
        </div>

        <p className={styles.teamSide}>
          {t(`events.matchDetails.bottom.dota.teamSide.${isRadiantLeft ? 'dire' : 'radiant'}`)}

          {isWinIconRight && (
            <Icon
              className={styles.iconWinner}
              size="small"
              iconName="cup"
            />
          )}
        </p>

        <div className={styles.wrapImages}>
          <HeroesPictures
            allHeroes={allHeroes}
            isRadiantHeroes={!isRadiantLeft}
            isDireHeroes={isRadiantLeft}
          />
        </div>
      </div>
    </div>
  )
}

GameStats.propTypes = {
  gameId: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(
    participantPropType,
  ).isRequired,
}

export default GameStats
