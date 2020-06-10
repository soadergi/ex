import React, { useMemo } from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import miniGamePropType from 'weplay-core/customPropTypes/miniGamePropType'

import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'

import styles from './MiniGamesCard.scss'
import SocialShareBlock from './SocialShareBlock/SocialShareBlock'

const MiniGamesCard = ({
  // required props
  game,
  // optional
}) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const gamePrizes = useMemo(() => game.prizes.global[0]?.[locale],
    [game, locale])
  // @TODO: @Andrew, @Artem, move all games route to general /mini-games/{game-name}/section?
  const gameLink = `${pathWithParamsByRoute(NAMES.MINI_GAMES)}/${game.link}`

  const dateNow = new Date()

  const isPrizesActive = dateNow >= new Date(game.prizedFrom) && dateNow < new Date(game.prizedTo)

  const MIN_GAME_SESSIONS_TO_SHOW = 100

  return (
    <div className={styles.block}>
      <figure className={styles.figure}>
        <Link
          to={gameLink}
          className={styles.imageLink}
          target="_blank"
        >
          <img
            className={styles.image}
            src={game.image.path}
            alt={game.link}
          />
        </Link>
      </figure>
      <Link
        to={gameLink}
        className={styles.title}
        target="_blank"
      >
        {game.name}
      </Link>
      {game.gameSessions >= MIN_GAME_SESSIONS_TO_SHOW && (
      <div className={classNames(
        styles.flex,
        'u-mb-2',
      )}
      >
        <Icon
          className={styles.icon}
          iconName="team"
        />
        <span className={styles.playedText}>
          {game.gameSessions}
          {' '}
          {t('mediaCore.miniGames.played')}
        </span>
      </div>
      )}
      {Boolean(game.socials.length) && (
        <>
          <div className={styles.shared}>
            <p className={styles.sharedTitle}>{t('mediaCore.miniGames.share')}</p>
          </div>
          <SocialShareBlock
            socials={game.socials}
            linkUrl={`/${game.link}`}
          />
        </>
      )}
      {gamePrizes?.length && isPrizesActive && (
        <div className={styles.flex}>
          <Icon
            className={styles.icon}
            iconName="prize"
          />
          <span className={styles.prizeText}>{gamePrizes}</span>
        </div>
      )}
    </div>
  )
}

MiniGamesCard.propTypes = {
  // required props
  game: miniGamePropType.isRequired,
}

export default MiniGamesCard
