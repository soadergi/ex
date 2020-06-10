import React from 'react'

import Section from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import EventNews from 'weplay-events/pages/EventPage/components/EventNews'
import SocialChannels from 'weplay-events/pages/EventPage/components/SocialChannels'

export default function NewsBlock() {
  return (
    <Section className="u-py-8">
      <ContentContainer>
        <EventNews />

        <SocialChannels />
      </ContentContainer>
    </Section>
  )
}
