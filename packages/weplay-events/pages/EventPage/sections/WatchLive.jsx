import React from 'react'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import VideoBlock from '../blocks/VideoBlock'

const WatchLive = () => (
  <div>
    <VideoBlock />
  </div>
)

export default withPageViewAnalytics()(WatchLive)
