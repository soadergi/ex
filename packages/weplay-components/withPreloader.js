import React from 'react'
import { branch, renderComponent } from 'recompose'

import Skeleton from 'weplay-components/Skeleton'

const FULLSCREEN_SKELETON_COUNT = 10

const withPreloader = ({
  mapPropsToIsLoading,
  isFullScreen,
  skeletonProps = {},
}) => branch(
  mapPropsToIsLoading,
  renderComponent(() => (
    <div>
      <Skeleton
        {...skeletonProps}
        {...isFullScreen && { count: FULLSCREEN_SKELETON_COUNT }}
      />
    </div>
  )),
)

export default withPreloader
