import * as R from 'ramda'
import React from 'react'
import Icon from 'weplay-components/Icon'

const NextArrow = (props) => {
  const arrowProps = R.omit(['currentSlide', 'slideCount'], props)

  return (
    <button
      {...arrowProps}
      type="button"
    >
      <Icon
        iconName="arrow-right"
      />
    </button>
  )
}

NextArrow.propTypes = {
  // required props

  // container props

  // optional props
}

NextArrow.defaultProps = {
  // optional props
}

export default React.memo(NextArrow)
