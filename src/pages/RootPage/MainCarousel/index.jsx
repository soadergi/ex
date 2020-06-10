import React from 'react'
import PropTypes from 'prop-types'
import mainCarouselSlidePropType from 'weplay-core/customPropTypes/hugeSlidePropType'
import HugeSlider from 'weplay-components/HugeSlider'

import container from './container'

const MainCarousel = ({
  // required props
  // container props
  title,
  slides,
  // optional props
}) => (
  <HugeSlider
    slides={slides}
    title={title}
  />
)

MainCarousel.propTypes = {
  // required props
  // container props
  title: PropTypes.string.isRequired,
  slides: PropTypes.arrayOf(mainCarouselSlidePropType).isRequired,
  // optional props
}

MainCarousel.defaultProps = {
  // optional props
}

export default container(MainCarousel)
