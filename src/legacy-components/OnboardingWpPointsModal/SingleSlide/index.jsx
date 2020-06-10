import React from 'react'
import PropTypes from 'prop-types'
import LegacyButton from 'weplay-components/LegacyButton'
import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

const buttonModificationsSkip = ['blockBorderLess']
const buttonModifications = ['blockCta']

const SingleSlide = ({
  // required props
  // container props
  i18nTexts,
  items,
  handleSkipButtonClick,
  handleContinueButtonClick,
  // optional props
}) => (
  <div className={styles.block}>
    <p className={styles.title}>
      {i18nTexts.onboardingWpPointsModal.title}
    </p>
    <p className={styles.text}>
      {`${i18nTexts.onboardingWpPointsModal.text} `}
      <span className="u-text-bold">{i18nTexts.onboardingWpPointsModal.boldText}</span>
    </p>

    <ul className={styles.list}>
      {items.map(item => (
        <li
          className={styles.listItem}
          key={item.icon}
        >
          <div className={styles.itemWrap}>
            <span className={styles.icon}>
              <Icon
                iconName={item.icon}
                size="large"
              />
            </span>
            {item.text}
          </div>
        </li>
      ))}
    </ul>

    <div className={styles.controlWrap}>
      <LegacyButton
        className={styles.skipBtn}
        modifiers={buttonModificationsSkip}
        onClick={handleSkipButtonClick}
        text={i18nTexts.onboardingWpPointsModal.skipBtn}
      />
      <LegacyButton
        className={styles.checkBtn}
        modifiers={buttonModifications}
        onClick={handleContinueButtonClick}
        text={i18nTexts.onboardingWpPointsModal.checkBtn}
      />
    </div>
  </div>
)

SingleSlide.propTypes = {
  // required props
  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  })).isRequired,
  handleSkipButtonClick: PropTypes.func.isRequired,
  handleContinueButtonClick: PropTypes.func.isRequired,
  // optional props
}

SingleSlide.defaultProps = {
  // optional props
}

export default container(SingleSlide)
