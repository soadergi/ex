import React from 'react'
import PropTypes from 'prop-types'

import container from './container'

const HashAnchor = ({
  // required props
  anchorId,
  // container props
  setAnchorElementRef,
  // optional props
}) => (
  <div
    id={anchorId}
    ref={setAnchorElementRef}
  />
)

HashAnchor.propTypes = {
  // required props
  anchorId: PropTypes.string.isRequired,
  // container props
  setAnchorElementRef: PropTypes.func.isRequired,
  // optional props
}

export default container(HashAnchor)
