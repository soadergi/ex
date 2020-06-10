import {
  compose,
  withState,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { triggerMutualModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { multipleSlideImages } from '../config'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
    triggerMutualModal,
  }),
  withState('activeSlide', 'setActiveSlide', 0),

  withPropsOnChange([
    'setActiveSlide',
  ], ({
    setActiveSlide,
  }) => ({
    carouselConfig: {
      speed: 100,
      dots: true,
      infinite: false,
      easing: 'linear',
      fade: true,
      afterChange: setActiveSlide,
    },
  })),

  withPropsOnChange([
    'i18nTexts',
  ], ({
    i18nTexts,
  }) => ({
    slides: multipleSlideImages.map((image, index) => ({
      imageUrl: image,
      tag: i18nTexts.onboardingWpPointsModal.slides.tag,
      logoTitle: i18nTexts.onboardingWpPointsModal.slides[index].logoTitle,
      title: i18nTexts.onboardingWpPointsModal.slides[index].title,
      text: i18nTexts.onboardingWpPointsModal.slides[index].text,
      textBold: i18nTexts.onboardingWpPointsModal.slides[index].textBold,
    })),
  })),

  withPropsOnChange([
    'activeSlide',
    'slides',
  ], ({
    activeSlide,
    slides,
  }) => ({
    paginationText: `${activeSlide + 1}/${slides.length}`,
    isLastSlide: activeSlide + 1 === slides.length,
  })),
)

export default container
