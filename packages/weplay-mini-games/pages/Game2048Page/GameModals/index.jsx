import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { openLoginModal as openLoginModalAction } from 'weplay-core/reduxs/_legacy/modals/actions'
import useAction from 'weplay-core/helpers/useAction'

import { GAME_MODALS } from '../GameBody/config'

import styles from './styles.scss'
import NewGameModal from './NewGameModal'
import WinGameModal from './WinGameModal'
import EndGameModal from './EndGameModal'

const GameModals = ({
  isLoggedIn,
  modalName,
  startGame,
  continueGame,
  restartGame,
}) => {
  const [isVisible, setVisibleStatus] = useState(false)
  const { openLoginModal } = useAction({
    openLoginModal: openLoginModalAction,
  })

  useEffect(() => {
    let timeout
    if (modalName) {
      timeout = setTimeout(() => setVisibleStatus(true), 0)
    } else {
      setVisibleStatus(false)
    }
    return () => clearTimeout(timeout)
  }, [modalName, setVisibleStatus])

  if (!modalName) return false

  return (
    <div className={styles.block}>
      <div className={classNames(
        styles.transitionBlock,
        { [styles.visible]: isVisible },
      )}
      >
        {modalName === GAME_MODALS.START && (
          <NewGameModal
            isLoggedIn={isLoggedIn}
            openLoginModal={openLoginModal}
            startGame={startGame}
          />
        )}
        {modalName === GAME_MODALS.WIN && (
          <WinGameModal
            isLoggedIn={isLoggedIn}
            openLoginModal={openLoginModal}
            continueGame={continueGame}
          />
        )}
        {modalName === GAME_MODALS.END && (
          <EndGameModal
            isLoggedIn={isLoggedIn}
            restartGame={restartGame}
          />
        )}
      </div>
    </div>
  )
}

GameModals.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  modalName: PropTypes.string,
  startGame: PropTypes.func.isRequired,
  continueGame: PropTypes.func.isRequired,
  restartGame: PropTypes.func.isRequired,
}

GameModals.defaultProps = {
  modalName: '',
}

export default GameModals
