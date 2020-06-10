import React from 'react'
import PropTypes from 'prop-types'

import SingleSlide from './SingleSlide'
import MultipleSlides from './MultipleSlides'
import container from './container'
import styles from './styles.scss'

const OnboardingWpPointsModal = ({
  // required props
  // container props
  isLoggedIn,
  blockInlineStyles,
  images,
  handleSkipButtonClick,
  handleContinueButtonClickWithLogin,
  handleContinueButtonClick,
  // optional props
}) => (
  <div
    className={styles.block}
    style={blockInlineStyles}
  >
    <div className={styles.header}>
      <div className={styles.logoWrap}>
        <img
          src={images.logo}
          className={styles.logo}
          alt="logo"
        />
      </div>
      <img
        src={images.points}
        className={styles.points}
        alt="points"
      />
    </div>

    {isLoggedIn ? (
      <MultipleSlides
        handleSkipButtonClick={handleSkipButtonClick}
        handleContinueButtonClick={handleContinueButtonClick}
      />
    ) : (
      <SingleSlide
        handleSkipButtonClick={handleSkipButtonClick}
        handleContinueButtonClick={handleContinueButtonClickWithLogin}
      />
    )}
  </div>
)

OnboardingWpPointsModal.propTypes = {
  // required props
  // container props
  isLoggedIn: PropTypes.bool.isRequired,
  blockInlineStyles: PropTypes.shape({}).isRequired,
  images: PropTypes.shape({
    logo: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
  }).isRequired,
  handleSkipButtonClick: PropTypes.func.isRequired,
  handleContinueButtonClickWithLogin: PropTypes.func.isRequired,
  handleContinueButtonClick: PropTypes.func.isRequired,
  // optional props
}

export default container(OnboardingWpPointsModal)
