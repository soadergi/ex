import React from 'react'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import VotingBlock from 'weplay-events/pages/EventPage/blocks/MVPVoting/MVPVoting'

const MVPVoting = () => (
  <VotingBlock />
)

export default withPageViewAnalytics()(MVPVoting)
