import React from 'react'
import { compose } from 'recompose'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import { withRoutes } from 'weplay-singleton/RoutesProvider/withRoutes'

import { useRouteInfo } from './useRouteInfo'

const withRouteInfo = WrappedComponent => (props) => {
  const { routeInfo } = useRouteInfo(props)
  return (
    <WrappedComponent
      {...props}
      routeInfo={routeInfo}
    />
  )
}

const container = compose(
  withRouter,
  withRoutes,
  withRouteInfo,
)

export default container
