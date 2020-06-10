import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'

import styles from '../styles.scss'

const SliderArrow = (
  props,
) => {
  const arrowProps = R.omit(['currentSlide', 'slideCount'], props)

  return (
    <button
      {...arrowProps}
      type="button"
      className={classNames(
        styles.arrow,
        styles[arrowProps.side],
      )}
      {...props}
    >
      {(arrowProps.side === 'left') ? (
        <Icon
          iconName="arrow-left"
        />
      ) : (
        <Icon
          iconName="arrow-right"
        />
      )}

    </button>
  )
}

SliderArrow.propTypes = {
  side: PropTypes.string.isRequired,
}

export default React.memo(SliderArrow)
