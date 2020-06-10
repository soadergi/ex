import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import Link from 'weplay-components/Link'
import ShareBlock from 'weplay-components/ShareBlock/ShareBlock'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'

const Body = ({
  handleAnimation,
  prediction,
  clickCount,
  isPredictionGenerating,
  hasPrediction,
}) => {
  const t = useTranslation()

  const text = prediction ? prediction.text : t('mediaCore.crystalBall.title')
  return (
    <div className={classNames(
      styles.block,
      {
        [styles.animation]: isPredictionGenerating,
      },
    )}
    >
      <h2 className={styles.title}>{text}</h2>
      {hasPrediction && prediction.link && (
        <Link
          to={prediction.link}
          className={styles.link}
        >
          {prediction.linkText}
          <Icon
            iconName="arrow-link"
            className={styles.arrow}
            size="small"
          />
        </Link>
      )}
      {!hasPrediction && (
      <p className={styles.description}>{t('mediaCore.crystalBall.description')}</p>
      )}
      {hasPrediction && clickCount !== 0 ? (
        <Button
          onClick={handleAnimation}
          priority={BUTTON_PRIORITY.SECONDARY}
          color={BUTTON_COLOR.WHITE}
          className={styles.button}
          {...getAnalyticsAttributes({
            category: 'crystal_ball_page',
            action: 'generate_prediction',
          })}
        >
          <Icon
            className={styles.icon}
            iconName="load-more"
            size="small"
          />
          {t('mediaCore.crystalBall.repeatButton')}
        </Button>
      ) : (
        <Button
          className={styles.button}
          onClick={handleAnimation}
          color={BUTTON_COLOR.CTA}
          {...getAnalyticsAttributes({
            category: 'crystal_ball_page',
            action: 'generate_prediction',
          })}
        >
          {t('mediaCore.crystalBall.button')}
        </Button>
      ) }
      <div className={styles.shareBlock}>
        <span className={styles.shareTitle}>{t('mediaCore.crystalBall.socialShareButton.title')}</span>
        <ShareBlock
          className={styles.share}
          color="circle"
          sharedText={t('mediaCore.crystalBall.sharedText')}
        />
      </div>
    </div>
  )
}

Body.propTypes = {
  handleAnimation: PropTypes.func.isRequired,
  isPredictionGenerating: PropTypes.bool.isRequired,
  prediction: PropTypes.shape({
    text: PropTypes.string,
    link: PropTypes.string,
    linkText: PropTypes.string,
  }).isRequired,
  clickCount: PropTypes.number.isRequired,
  hasPrediction: PropTypes.bool.isRequired,
}

export default Body
