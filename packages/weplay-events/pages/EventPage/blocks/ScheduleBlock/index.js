import React from 'react'

import Section from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import useCurrentTournamentStatus from 'weplay-events/pages/EventPage/hooks/useCurrentTournamentStatus'
import Schedule from 'weplay-events/pages/EventPage/components/Schedule'

export default function ScheduleBlock() {
  const { isUpcoming } = useCurrentTournamentStatus()

  if (isUpcoming) return null

  return (
    <Section className="u-py-8">
      <ContentContainer>
        <Schedule />
      </ContentContainer>
    </Section>
  )
}
