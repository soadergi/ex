import React from 'react'
import PropTypes from 'prop-types'
import SlickSlider from 'weplay-components/Slider/loadable'
import mainCarouselSlidePropType from 'weplay-core/customPropTypes/hugeSlidePropType'

import Slide from './Slide'
import SliderDots from './SliderDots'
import NavItem from './NavItem'
import container from './container'
import styles from './styles.scss'

const HugeSlider = ({
  // required props
  slides,
  // container props
  carouselConfig,
  activeSlide,
  // optional props
  title,
  subheader,
}) => (
  <div className={styles.block}>
    <SlickSlider
      {...carouselConfig}
      appendDots={dotsList => (
        <SliderDots
          title={title}
          dotsList={dotsList}
          activeDot={activeSlide}
        />
      )}
      customPaging={i => (
        <div>
          <NavItem
            control={slides[i]}
            isActive={activeSlide === i}
          />
        </div>
      )}
    >
      {slides.map((slide, index) => (
        <Slide
          key={slide.id}
          slide={slide}
          isActive={activeSlide === index}
          subheader={subheader}
          isDotsDisabled={!carouselConfig.dots}
        />
      ))}
    </SlickSlider>
  </div>
)

HugeSlider.propTypes = {
  // required props
  slides: PropTypes.arrayOf(mainCarouselSlidePropType).isRequired,
  // container props
  carouselConfig: PropTypes.shape({
    dots: PropTypes.bool.isRequired,
  }).isRequired,
  activeSlide: PropTypes.number.isRequired,
  // optional props
  title: PropTypes.string,
  subheader: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
}

HugeSlider.defaultProps = {
  // optional props
  title: '',
  subheader: false,
}

export default container(HugeSlider)
