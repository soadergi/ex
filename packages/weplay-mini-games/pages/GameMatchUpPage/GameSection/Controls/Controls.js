import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY, BUTTON_SIZE } from 'weplay-components/Button'

import styles from './Controls.scss'
import TimeResult from './TimeResult/TimeResult'

const Controls = ({
  currentTime,
  bestTime,
  onButtonClick,
  hasBestResult,
  hasButton,
}) => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <div className={styles.timers}>
        <TimeResult
          name={t('mediaCore.gameMatchUp.timers.current')}
          time={currentTime}
          isHighlighted
        />
        {hasBestResult && (
          <TimeResult
            name={t('mediaCore.gameMatchUp.timers.best')}
            time={bestTime}
          />
        )}
      </div>
      {hasButton && (
        <Button
          priority={BUTTON_PRIORITY.SECONDARY}
          size={BUTTON_SIZE.SM}
          color={BUTTON_COLOR.WHITE}
          icon="reset"
          onClick={onButtonClick}
          className={styles.button}
        >
          {t('mediaCore.miniGames.buttons.resetGame')}
        </Button>
      )}
    </div>
  )
}

Controls.propTypes = {
  currentTime: PropTypes.string.isRequired,
  bestTime: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  hasBestResult: PropTypes.bool.isRequired,
  hasButton: PropTypes.bool.isRequired,
}

export default React.memo(Controls)
