import React from 'react'
import * as PropTypes from 'prop-types'

import { RouterContext } from './routerContext'

const RouterProvider = ({
  children,
  ...props
}) => (
  <RouterContext.Provider value={props}>
    {children}
  </RouterContext.Provider>
)

RouterProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(RouterProvider)
