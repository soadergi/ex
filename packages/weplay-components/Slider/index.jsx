import React from 'react'
import PropTypes from 'prop-types'
import SlickSlider from 'react-slick/lib'

import container from './container'
import './slider.scss'

export const SliderMarkup = ({
  // required props
  children,

  // container props

  // optional props
  ...props
}) => (
  <SlickSlider
    {...props}
  >
    {children}
  </SlickSlider>
)

SliderMarkup.propTypes = {
  // required props
  children: PropTypes.arrayOf(PropTypes.node).isRequired,

  // container props

  // optional props
}

SliderMarkup.defaultProps = {
  // optional props
}

export default container(SliderMarkup)
