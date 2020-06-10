import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './styles.scss'

const Score = ({
  // required props
  isLoggedIn,
  score,
  highScore,
}) => {
  const t = useTranslation()
  return (
    <>
      <div className={classNames(
        styles.block,
        {
          [styles.grid]: isLoggedIn,
        },
      )}
      >
        <div className={styles.wrapper}>
          <p className={styles.text}>
            {t('mediaCore.gameLoonyDragon.modals.gameOver.scoreText')}
          </p>
          <p className={styles.score}>
            {score}
          </p>
        </div>
        {isLoggedIn && (
        <div className={styles.wrapper}>
          <p className={classNames(
            styles.text,
            styles.bestText,
          )}
          >
            {t('mediaCore.gameLoonyDragon.modals.gameOver.bestScoreText')}
          </p>
          <p className={classNames(
            styles.score,
            styles.bestScore,
          )}
          >
            {highScore}
          </p>
        </div>
        )}
      </div>
    </>
  )
}

Score.propTypes = {
  // required props
  isLoggedIn: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
}

export default (Score)
