import * as R from 'ramda'
import {
  compose,
  withState,
  withPropsOnChange,
} from 'recompose'

const container = compose(
  withPropsOnChange([
    'slides',
  ], ({
    slides,
  }) => ({
    slides: R.isEmpty(slides) || R.isNil(slides) ? new Array(3).fill({
      url: '/',
      title: '',
      text: '',
      images: {},
    }).map((slide, i) => Object.assign(slide, { id: i })) : slides,
  })),

  withState('activeSlide', 'setActiveSlide', 0),
  withPropsOnChange([
    'slides',
    'setActiveSlide',
  ], ({
    slides,
    setActiveSlide,
  }) => ({
    carouselConfig: {
      speed: 500,
      arrows: false,
      dots: !R.length(slides) < 2,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: false,
      touchThreshold: 1000,
      easing: 'ease',
      fade: true,
      afterChange: setActiveSlide,
    },
  })),
)

export default container
