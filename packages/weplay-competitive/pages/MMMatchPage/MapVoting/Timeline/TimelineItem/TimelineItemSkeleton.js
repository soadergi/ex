import React from 'react'

import Skeleton from 'weplay-components/Skeleton'

const TimelineItemSkeleton = () => (
  <Skeleton
    circle
    width="24px"
    height="24px"
  />
)

export default React.memo(TimelineItemSkeleton)
