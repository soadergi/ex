import * as R from 'ramda'
import React from 'react'
import Icon from 'weplay-components/Icon'

const PrevArrow = (props) => {
  const arrowProps = R.omit(['currentSlide', 'slideCount'], props)

  return (
    <button
      {...arrowProps}
      type="button"
    >
      <Icon
        iconName="arrow-left"
      />
    </button>
  )
}

PrevArrow.propTypes = {
  // required props

  // container props

  // optional props
}

PrevArrow.defaultProps = {
  // optional props
}

export default React.memo(PrevArrow)
