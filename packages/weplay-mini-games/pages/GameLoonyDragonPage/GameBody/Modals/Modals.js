import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import useAction from 'weplay-core/helpers/useAction'
import { openLoginModal as openLoginModalAction } from 'weplay-core/reduxs/_legacy/modals/actions'

import { MODAL_NAMES } from './config'
import GameOverModal from './GameOverModal'
import styles from './Modals.scss'
import WelcomeModal from './WelcomeModal'

const Modals = ({
  modalName,
  score,
  closeModal,
  isVisible,
  isLoggedIn,
  highScore,
}) => {
  const { openLoginModal } = useAction({ openLoginModal: openLoginModalAction })

  return (
    <div className={classNames(
      styles.block,
      {
        [styles.visible]: isVisible,
        [styles.gameOver]: modalName === MODAL_NAMES.GAME_OVER,
      },
    )}
    >
      {modalName === MODAL_NAMES.WELCOME && (
        <WelcomeModal
          closeModal={closeModal}
          openLoginModal={openLoginModal}
        />
      )}
      {modalName === MODAL_NAMES.GAME_OVER && (
        <GameOverModal
          score={score}
          isLoggedIn={isLoggedIn}
          openLoginModal={openLoginModal}
          closeModal={closeModal}
          highScore={highScore}
        />
      )}
    </div>
  )
}

Modals.propTypes = {
  modalName: PropTypes.bool,
  score: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  highScore: PropTypes.number.isRequired,
}

Modals.defaultProps = {
  modalName: null,
}

export default React.memo(Modals)
