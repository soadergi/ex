import React, { useCallback } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import { useDispatch } from 'react-redux'

import { saveWindowWidth } from 'weplay-core/reduxs/_legacy/layout/actions'

const ResizeDetector = () => {
  const dispatch = useDispatch()
  const handleResize = useCallback((
    width,
  ) => {
    // TODO: maybe better use window here
    const action = saveWindowWidth(width)
    dispatch(action)
  }, [
    dispatch,
  ])
  return (
    <ReactResizeDetector
      handleWidth
      onResize={handleResize}
    />
  )
}

export default React.memo(ResizeDetector)
