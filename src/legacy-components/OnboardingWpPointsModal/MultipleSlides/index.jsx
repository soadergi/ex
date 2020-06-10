import React from 'react'
import SlickSlider from 'weplay-components/Slider/loadable'
import PropTypes from 'prop-types'
import LegacyButton from 'weplay-components/LegacyButton'

import Slide from './Slide'
import OnboardingSliderArrow from './OnboardingSliderArrow'
import container from './container'
import styles from './styles.scss'

const buttonModifications = ['blockBorderLess', 'blockLink']

const MultipleSlides = ({
  // required props
  // container props
  i18nTexts,
  activeSlide,
  carouselConfig,
  slides,
  paginationText,
  isLastSlide,
  handleSkipButtonClick,
  handleContinueButtonClick,
  // optional props
}) => (
  <div
    className={styles.block}
  >
    <SlickSlider
      {...carouselConfig}
      prevArrow={<OnboardingSliderArrow />}
      nextArrow={<OnboardingSliderArrow text={i18nTexts.onboardingWpPointsModal.slides.nextBtn} />}
      arrows={!isLastSlide}
    >
      {slides.map((slide, index) => (
        <Slide
          key={slide.imageUrl}
          imageUrl={slide.imageUrl}
          tag={slide.tag}
          logoTitle={slide.logoTitle}
          title={slide.title}
          text={slide.text}
          textBold={slide.textBold}
          isActive={activeSlide === index}
        />
      ))}
    </SlickSlider>

    <LegacyButton
      modifiers={buttonModifications}
      className={styles.skipButton}
      onClick={handleSkipButtonClick}
      text={i18nTexts.onboardingWpPointsModal.slides.skipBtn}
    />
    <div className={styles.count}>
      {paginationText}
    </div>

    {isLastSlide && (
      <LegacyButton
        text={i18nTexts.onboardingWpPointsModal.slides.continueBtn}
        className={styles.continueButton}
        onClick={handleContinueButtonClick}
      />
    )}
  </div>
)

MultipleSlides.propTypes = {
  // required props
  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  activeSlide: PropTypes.number.isRequired,
  slides: PropTypes.arrayOf(PropTypes.shape({
    tag: PropTypes.string.isRequired,
    logoTitle: PropTypes.string,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    textBold: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
  })).isRequired,
  carouselConfig: PropTypes.shape({}).isRequired,
  paginationText: PropTypes.string.isRequired,
  isLastSlide: PropTypes.bool.isRequired,
  handleSkipButtonClick: PropTypes.func.isRequired,
  handleContinueButtonClick: PropTypes.func.isRequired,
  // optional props
}

export default container(MultipleSlides)
