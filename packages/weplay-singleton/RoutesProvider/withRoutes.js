import React from 'react'

import { useRoutes } from './useRoutes'

export const withRoutes = WrappedComponent => (props) => {
  const routesProps = useRoutes()
  return (
    <WrappedComponent
      {...props}
      {...routesProps}
    />
  )
}
