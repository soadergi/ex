import {
  compose,
  withProps,
  withState,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withState('activeSlide', 'setActiveSlide', 0),

  withProps(({
    setActiveSlide,
  }) => ({
    carouselConfig: {
      centerMode: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      centerPadding: '0px',
      speed: 100,
      arrows: false,
      dots: false,
      infinite: false,
      autoplay: false,
      afterChange: setActiveSlide,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 1,
            centerPadding: '25%',
            infinite: true,
          },
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 1,
            centerPadding: '20%',
            infinite: true,
          },
        },
      ],
    },
  })),
)

export default container
