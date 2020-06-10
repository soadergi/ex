import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { useModalsMapper } from 'weplay-mini-games/components/ModalsMapper/useModalMapper'
import ModalsMapper from 'weplay-mini-games/components/ModalsMapper/ModalsMapper'
import ShareGameBlock from 'weplay-mini-games/components/ShareGameBlock/ShareGameBlock'

import { MODALS } from './config'
import styles from './GameSection.scss'
import Controls from './Controls/Controls'
import GameBody from './GameBody/GameBody'
import StartGameModal from './Modals/StartGameModal'
import EndGameModal from './Modals/EndGameModal'
import { useGameData } from './useGameData'
import { useGameHandlers } from './useGameHandlers'

// TODO: @Andrew, just mocked data
const bestTime = '00:42:00'

const GameSection = ({
  gameId,
  isGameActive,
}) => {
  const isLoggedIn = useSelector(isLoggedInSelector)

  const t = useTranslation()
  const {
    modalName,
    openModal,
    closeModal,
    isModalActive,
  } = useModalsMapper()

  const {
    currentTime,
    board,
    handleGameData,
    isGameOver,
  } = useGameData()

  const {
    handleGameStart,
    handleGameRestart,
    sendTilePosition,
  } = useGameHandlers({
    gameId,
    handleGameData,
    closeModal,
  })

  useEffect(() => {
    openModal(MODALS.START)
  }, [openModal])

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => openModal(MODALS.END), 1000)
    }
  }, [isGameOver, openModal])

  return (
    <>
      <Controls
        currentTime={currentTime}
        bestTime={bestTime}
        onButtonClick={handleGameRestart}
        hasBestResult={isLoggedIn}
        hasButton={isGameActive && !isGameOver}
      />

      <div className={classNames(!isGameActive && styles.tabHidden)}>
        <div className={classNames(
          styles.gameBody,
          isModalActive && styles.bodyHidden,
        )}
        >
          <GameBody
            board={board}
            sendTilePosition={sendTilePosition}
          />
          <ShareGameBlock
            caption={t('mediaCore.miniGames.share')}
            shareText={t('mediaCore.gameMatchUp.shareGameBlock.shareText')}
            className={styles.shareWrap}
          />
        </div>

        <ModalsMapper currentModalName={modalName}>
          <StartGameModal
            name={MODALS.START}
            onStartButtonClick={handleGameStart}
            isLoggedIn={isLoggedIn}
          />
          <EndGameModal
            name={MODALS.END}
            duration={currentTime}
            onStartButtonClick={handleGameStart}
          />
        </ModalsMapper>
      </div>
    </>
  )
}

GameSection.propTypes = {
  gameId: PropTypes.number.isRequired,
  isGameActive: PropTypes.bool.isRequired,
}

export default GameSection
