import React from 'react'

import Section from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import Standings from 'weplay-events/pages/EventPage/components/Standings'
import useCurrentTournamentStatus from 'weplay-events/pages/EventPage/hooks/useCurrentTournamentStatus'

export default function StandingsBlock() {
  const { isUpcoming } = useCurrentTournamentStatus()

  if (isUpcoming) return null

  return (
    <Section className="u-pt-8 u-pb-0">
      <ContentContainer>
        <Standings />
      </ContentContainer>
    </Section>
  )
}
