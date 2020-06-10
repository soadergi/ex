import React from 'react'
import * as PropTypes from 'prop-types'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'

import styles from './styles.scss'

const sizes = {
  short: '80px',
  medium: '200px',
}

const Skeleton = ({
  count,
  width,
  height,
  minWidth,
  size,
  circle,
  wrapper,
}) => {
  const style = {}
  const elements = []
  for (let i = 0; i < count; i++) { // eslint-disable-line no-plusplus
    if (width != null) {
      style.width = width
    }
    if (height != null) {
      style.height = height
    }
    if (minWidth !== null) {
      style.minWidth = minWidth
    }
    if (width !== null && height !== null && circle) {
      style.borderRadius = '50%'
    }
    if (sizes[size]) {
      style.width = sizes[size]
    }
    elements.push(
      <span
        data-qa-id={dataQaIds.core.skeletonSpan}
        key={i}
        className={styles.skeleton}
        style={style}
      >
        &zwnj;
      </span>,
    )
  }

  return (
    wrapper
      ? elements.map(element => (
        <wrapper key={element}>
          {element}
          &zwnj;
        </wrapper>
      ))
      : elements
  )
}

Skeleton.propTypes = {
  // optional props
  count: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  minWidth: PropTypes.string,
  circle: PropTypes.bool,
  wrapper: PropTypes.func,
}

Skeleton.defaultProps = {
  // optional props
  count: 1,
  width: null,
  wrapper: null,
  height: null,
  minWidth: null,
  circle: false,
}

export default React.memo(Skeleton)
