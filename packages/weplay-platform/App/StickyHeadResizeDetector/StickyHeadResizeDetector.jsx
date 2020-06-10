import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import ReactResizeDetector from 'react-resize-detector'
import { setGlobalCSSVar } from 'weplay-core/helpers/setGlobalCSSVar'

const STICKY_HEAD_HEIGHT_CSS_VAR = 'wp-sticky-head-height'
const StickyHeadResizeDetector = ({
  // required props
  globalScope,
  // container props
  // optional props
}) => {
  const onResize = useCallback(
    (width, height) => {
      setGlobalCSSVar({
        globalScope,
        varName: STICKY_HEAD_HEIGHT_CSS_VAR,
        varValue: `${height}px`,
      })
    },
    [],
  )

  return (
    <ReactResizeDetector
      handleHeight
      onResize={onResize}
    />
  )
}

StickyHeadResizeDetector.propTypes = {
  // required props
  globalScope: PropTypes.shape({}).isRequired,
  // container props
  // optional props
}

StickyHeadResizeDetector.defaultProps = {
  // optional props
}

export default StickyHeadResizeDetector
