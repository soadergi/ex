import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import ReactResizeDetector from 'react-resize-detector'
import useAction from 'weplay-core/helpers/useAction'
import { saveWindowWidth as saveWindowWidthAction } from 'weplay-core/reduxs/_legacy/layout/actions'
import { windowWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import InitialPreloader from 'weplay-components/InitialPreloader'

import { useMain } from './container'

const Main = ({
  history,
  location,
  children,
}) => {
  const { isLoading } = useMain({
    history,
    location,
  })
  const globalScope = useSelector(globalScopeSelector)
  const windowWidth = useSelector(windowWidthSelector)
  const { saveWindowWidth } = useAction({
    saveWindowWidth: saveWindowWidthAction,
  })
  const onResize = () => {
    if (windowWidth !== globalScope.innerWidth) {
      saveWindowWidth(globalScope.innerWidth)
    }
  }

  if (isLoading) {
    return (
      <InitialPreloader />
    )
  }

  return (
    <>
      {children}
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={onResize}
      />
    </>
  )
}

Main.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
}

Main.defaultProps = {
  // optional props
}

export default React.memo(Main)
