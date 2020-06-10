import React from 'react'

import { useLoaderContext } from './useLoaderContext'

export const withLoader = WrappedComponent => (props) => {
  const newProps = useLoaderContext()
  return (
    <WrappedComponent
      {...props}
      {...newProps}
    />
  )
}
