import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import Score from './Score'
import styles from './Modals.scss'

const GameOverModal = ({
  score,
  isLoggedIn,
  closeModal,
  highScore,
}) => {
  const t = useTranslation()
  const globalScope = useSelector(globalScopeSelector)

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault()
        closeModal()
      }
    }
    globalScope.addEventListener('keydown', handleKeyPress)

    return () => globalScope.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <>
      <p className={styles.title}>
        {t('mediaCore.gameLoonyDragon.modals.gameOver.title')}
      </p>
      <Score
        score={score}
        highScore={highScore}
        isLoggedIn={isLoggedIn}
      />
      <Button
        className={classNames(
          styles.button,
          'u-mt-3',
          'u-mb-2',
        )}
        onClick={closeModal}
        color={BUTTON_COLOR.CTA}
      >
        {t('mediaCore.gameLoonyDragon.modals.gameOver.buttonPlayAgain')}
      </Button>
    </>
  )
}

GameOverModal.propTypes = {
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default GameOverModal
