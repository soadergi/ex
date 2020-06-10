import React from 'react'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import ScheduleBlock from '../blocks/ScheduleBlock'

const Schedule = () => (
  <div>
    <ScheduleBlock />
  </div>
)

export default withPageViewAnalytics()(Schedule)
