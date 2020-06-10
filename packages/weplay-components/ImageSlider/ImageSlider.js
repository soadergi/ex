import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import Slider from 'weplay-components/Slider' // TODO:  check why this is not working in b2b on windows

import SlideItem from './SlideItem/SlideItem'
import NextArrow from './NextArrow/NextArrow'
import PrevArrow from './PrevArrow/PrevArrow'
import styles from './ImageSlider.scss'
import { sliderSettings } from './sliderSettings'

const SPLIT_QUANTITY = 3

const ImageSlider = ({
  // required props
  images,

  // container props

  // optional props
}) => (
  <div className={styles.block}>
    <Slider
      {...sliderSettings}
      prevArrow={<PrevArrow />}
      nextArrow={<NextArrow />}
    >
      {R.splitEvery(SPLIT_QUANTITY, images).map((imagesArray, index) => (
        <SlideItem
          key={imagesArray.join('')}
          photos={imagesArray}
          isEven={index % 2 !== 0}
        />
      ))}
    </Slider>
  </div>

)

ImageSlider.propTypes = {
  // required props
  images: PropTypes.arrayOf(PropTypes.string).isRequired,

  // container props

  // optional props
}

export default React.memo(ImageSlider)
