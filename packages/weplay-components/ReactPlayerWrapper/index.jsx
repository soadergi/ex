import * as PropTypes from 'prop-types'
import React from 'react'
import ReactPlayer from 'react-player'

const ReactPlayerWrapper = ({
  innerRef,
  ...props
}) => (
  <ReactPlayer
    {...props}
    ref={innerRef}
  />
)

ReactPlayerWrapper.propTypes = {
  innerRef: PropTypes.func,
}

ReactPlayerWrapper.defaultProps = {
  innerRef: null,
}

export default ReactPlayerWrapper
