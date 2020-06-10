import {
  compose,
  withProps,
  withStateHandlers,
  withPropsOnChange,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

const container = compose(
  withAnalytics,
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),

  withProps({
    topSliderConfig: {
      slidesToShow: 4,
      speed: 500,
      dots: true,
      autoplay: true,
      autoplaySpeed: 4000,
      touchThreshold: 1000,
      pauseOnDotsHover: true,
      pauseOnFocus: true,
      swipeToSlide: true,
      easing: 'easeInOut',
      responsive: [
        {
          breakpoint: 1680,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            centerMode: true,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            centerMode: true,
          },
        },
      ],
    },
  }),

  withStateHandlers({
    isAutoplay: true,
  }, {
    stopSliderAutoplay: () => () => ({
      isAutoplay: false,
    }),
  }),

  withPropsOnChange([
    'isAutoplay',
    'topSliderConfig',
  ], ({
    isAutoplay,
    topSliderConfig,
  }) => ({
    progressBarStyle: isAutoplay
      ? { animationDuration: `${topSliderConfig.autoplaySpeed / 1000}s` }
      : { animation: 'none' },
  })),

  withHandlers({
    stopSliderAutoplayDeferred: ({
      stopSliderAutoplay,
      topSliderConfig,
    }) => () => setTimeout(stopSliderAutoplay, topSliderConfig.speed),
  }),

  withHandlers({
    /* eslint-disable no-shadow */
    createSlideClickHandler: ({
      logAnalytics,
    }) => slideIndex => () => {
      logAnalytics({
        eventCategory: 'Content click',
        eventAction: 'Header Slider block',
        eventLabel: `${slideIndex + 1}`,
      })
    },
    createArrowClickHandler: ({
      stopSliderAutoplayDeferred,
      logAnalytics,
    }) => eventLabel => () => {
      stopSliderAutoplayDeferred()
      logAnalytics({
        eventCategory: 'Content click',
        eventAction: 'Slider arrow controls',
        eventLabel,
      })
    },
  }),
)

export default container
