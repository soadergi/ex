import React from 'react'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import ParticipantsBlock from '../blocks/ParticipantsBlock'

const Participants = () => (
  <div>
    <ParticipantsBlock />
  </div>
)

export default withPageViewAnalytics()(Participants)
