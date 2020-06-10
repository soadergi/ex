import React from 'react'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import StandingsBlock from '../blocks/StandingsBlock'

const Standings = () => (
  <div>
    <StandingsBlock />
  </div>
)

export default withPageViewAnalytics()(Standings)
