import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { windowWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import { useMiniGameHighScore } from 'weplay-mini-games/hooks/useMiniGameHighScore'

import styles from './GameBody.scss'
import Modals from './Modals/Modals'
import { MODAL_NAMES } from './Modals/config'
import GameEngine from './GameEngine/GameEngine'

const SMALL_WIDTH = 380

const GameBody = ({ gameId }) => {
  const isLoggedIn = useSelector(isLoggedInSelector)
  const windowWidth = useSelector(windowWidthSelector)
  const { highScore } = useMiniGameHighScore({ gameId })

  const [score, setScore] = useState(0)

  const [modalName, setModalName] = useState(null)

  const openModal = name => setModalName(name)
  const closeModal = () => setModalName(null)

  const isModalVisible = useMemo(() => Boolean(modalName), [modalName])
  const isSmallWidth = useMemo(() => (windowWidth < SMALL_WIDTH), [windowWidth])

  const handleEndGame = useCallback((resultScore) => {
    setModalName(MODAL_NAMES.GAME_OVER)
    setScore(resultScore)
  }, [setModalName, setScore])

  useEffect(() => {
    openModal(!isLoggedIn ? MODAL_NAMES.WELCOME : null)
  }, [isLoggedIn])

  return (
    <div className={styles.block}>
      {!isModalVisible && (
        <GameEngine
          className={styles.container}
          onEndGame={handleEndGame}
          isSmallWidth={isSmallWidth}
          gameId={gameId}
        />
      )}

      <Modals
        modalName={modalName}
        score={score}
        highScore={highScore}
        closeModal={closeModal}
        isVisible={isModalVisible}
        isLoggedIn={isLoggedIn}
      />
    </div>
  )
}
GameBody.propTypes = {
  gameId: PropTypes.string.isRequired,
}

export default GameBody
