import * as R from 'ramda'
import React from 'react'
import Icon from 'weplay-components/Icon'

import styles from '../PrevArrow/styles.scss'

const Index = (props) => {
  const arrowProps = R.omit(['currentSlide', 'slideCount'], props)

  return (
    <button
      {...arrowProps}
      type="button"
      className={styles.nextArrow}
    >
      <Icon
        iconName="arrow-right"
      />
    </button>
  )
}

Index.propTypes = {
  // required props

  // container props

  // optional props
}

Index.defaultProps = {
  // optional props
}

export default React.memo(Index)
