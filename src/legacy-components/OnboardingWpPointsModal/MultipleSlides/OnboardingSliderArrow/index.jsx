import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import LegacyButton from 'weplay-components/LegacyButton'

import container from './container'

const OnboardingSliderArrow = ({
  // required props
  onClick,
  // container props
  // optional props
  text,
  className,
}) => (
  <LegacyButton
    className={className}
    text={text}
    onClick={onClick}
  />
)

OnboardingSliderArrow.propTypes = {
  // required props
  // container props
  // optional props
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

OnboardingSliderArrow.defaultProps = {
  // optional props
  text: '',
  className: true,
  onClick: R.always,
}

export default container(OnboardingSliderArrow)
