import React, { useMemo, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button, { BUTTON_COLOR } from 'weplay-components/Button'
import Icon from 'weplay-components/Icon'

import styles from './PredictButton.scss'

function PredictButton({
  handlePredict,
  isPredicted,
  score,
  disabled,
  iconClassName,
  textClassName,
}) {
  const t = useTranslation()
  const [isLoading, setLoading] = useState(false)

  const handleClick = useCallback(() => {
    setLoading(true)
    handlePredict().then(() => setLoading(false)).catch(() => setLoading(false))
  }, [handlePredict])

  const scoreText = useMemo(() => {
    if (score === null) {
      return t('events.predictionMatch.predicted')
    }
    return `+${score} ${t('events.predictionMatch.points')}`
  }, [score, t])

  return (
    <>
      {isPredicted && (
        <span
          className={classNames(
            styles.text,
            textClassName,
          )}
        >
          <Icon
            iconName="check"
            size="small"
            className={classNames(
              styles.icon,
              iconClassName,
            )}
          />
          {scoreText}
        </span>
      )}

      {!isPredicted && (
        <Button
          className={styles.button}
          color={BUTTON_COLOR.BASIC}
          disabled={disabled}
          onClick={handleClick}
          isLoading={isLoading}
        >
          {t('events.predictionsMainBlock.matches.match.buttonText')}
        </Button>
      )}
    </>
  )
}

PredictButton.propTypes = {
  isPredicted: PropTypes.bool.isRequired,
  score: PropTypes.number,
  disabled: PropTypes.bool,
  iconClassName: PropTypes.string,
  textClassName: PropTypes.string,
  handlePredict: PropTypes.func.isRequired,
}

PredictButton.defaultProps = {
  score: null,
  disabled: false,
  iconClassName: '',
  textClassName: '',
}

export default React.memo(PredictButton)
