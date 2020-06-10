import React from 'react'

import { useContentStatus } from 'weplay-media/hooks/useContentStatus'

const withContentStatus = WrappedComponent => (props) => {
  const { handleContentStatus } = useContentStatus()
  return (
    <WrappedComponent
      {...props}
      handleContentStatus={handleContentStatus}
    />
  )
}

export default withContentStatus
