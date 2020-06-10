import React from 'react'

import Section from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import TeamsList from 'weplay-events/pages/EventPage/components/TeamsList'

export default function ParticipantsBlock() {
  return (
    <Section className="u-py-8">
      <ContentContainer>
        <TeamsList />
      </ContentContainer>
    </Section>
  )
}
