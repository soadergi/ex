import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import GameNavLinks from '../GameNavLinks/GameNavLinks'

import styles from './GameMenu.scss'

const GameMenu = ({
  className,
  gamePath,
  globalLadderPath,
  dailyLadderPath,
  prizesPath,
}) => {
  const t = useTranslation()

  const navLinks = useMemo(() => ([
    {
      path: gamePath,
      name: t('mediaCore.miniGames.navLink.game'),
      isExact: true,
    },
    {
      path: globalLadderPath,
      name: t('mediaCore.miniGame.gameMenu.ladderType.global'),
    },
    {
      path: dailyLadderPath,
      name: t('mediaCore.miniGame.gameMenu.ladderType.daily'),
    },
    {
      path: prizesPath,
      name: t('mediaCore.miniGames.navLink.prizes'),
    },
  ].filter(item => Boolean(item.path))
  ), [gamePath, globalLadderPath, dailyLadderPath, prizesPath, t])

  return (
    <div className={className}>
      <GameNavLinks
        navLinks={navLinks}
        className={styles.navLink}
        color="white"
      />
    </div>
  )
}

GameMenu.propTypes = {
  className: PropTypes.string,
  gamePath: PropTypes.string.isRequired,
  globalLadderPath: PropTypes.string,
  dailyLadderPath: PropTypes.string,
  prizesPath: PropTypes.string,
}

GameMenu.defaultProps = {
  className: '',
  globalLadderPath: '',
  dailyLadderPath: '',
  prizesPath: '',
}

export default GameMenu
