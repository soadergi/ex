import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Game2048Container, game2048 } from '2048-game'
import { useSelector } from 'react-redux'
import { Prompt } from 'react-router-dom'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isLoggedInSelector, userIdSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY, BUTTON_SIZE } from 'weplay-components/Button'

import ShareGameBlock from 'weplay-mini-games/components/ShareGameBlock/ShareGameBlock'
// TODO: think about encapsulation
// TODO: add state isHidden for .shareWrap

import GameModals from '../GameModals'

import styles from './styles.scss'
import { useGameBody } from './container'

const GameBody = ({
  socketUrl,
  setCurrentScore,
}) => {
  const userId = useSelector(userIdSelector)
  const isLoggedIn = useSelector(isLoggedInSelector)

  const [isDemoPlay, setIsDemoPlay] = useState(!isLoggedIn)

  const t = useTranslation()
  const {
    modalName,
    gameConfig,
    closeModals,
    handleGameStart,
    handleGameWin,
    handleGameOver,
    isGameStarted,
  } = useGameBody()

  useEffect(() => {
    if (isLoggedIn && !isGameStarted && isDemoPlay) {
      setCurrentScore(0)
    }
  }, [isLoggedIn, isGameStarted, setCurrentScore, isDemoPlay])

  useEffect(() => {
    if (userId) {
      game2048.log(userId)
      setIsDemoPlay(false)
    }
  }, [userId])

  if (!socketUrl) return null

  return (
    <>
      {isGameStarted && (
        <div className={styles.reset}>
          <span>{t('mediaCore.game2048.reset.text')}</span>
          <Button
            priority={BUTTON_PRIORITY.SECONDARY}
            size={BUTTON_SIZE.SM}
            color={BUTTON_COLOR.WHITE}
            icon="reset"
            onClick={game2048.restart}
          >
            {t('mediaCore.game2048.reset.button')}
          </Button>
        </div>
      )}

      <div className={classNames(
        styles.block,
        { [styles.modalActive]: Boolean(modalName) },
      )}
      >
        <div className={styles.gameWrapper}>
          <Game2048Container
            apiUrl={socketUrl}
            className={styles.gameContainer}
            {...gameConfig}
            onScoreChange={setCurrentScore}
            onGameStart={handleGameStart}
            onGameWon={handleGameWin}
            onGameContinue={closeModals}
            onGameOver={handleGameOver}
          />
          <ShareGameBlock
            caption={t('mediaCore.game2048.socialShareButton.title')}
            shareText={t('mediaCore.game2048.sharedText')}
            className={styles.shareWrap}
          />
        </div>

        <GameModals
          isLoggedIn={isLoggedIn}
          modalName={modalName}
          startGame={game2048.start}
          continueGame={game2048.continue}
          restartGame={game2048.restart}
        />

        <Prompt
          when={!userId && isGameStarted}
          message={t('mediaCore.game2048.popup.alertPrompt')}
        />
      </div>
    </>
  )
}

GameBody.propTypes = {
  socketUrl: PropTypes.string.isRequired,
  setCurrentScore: PropTypes.func.isRequired,
}

export default GameBody
