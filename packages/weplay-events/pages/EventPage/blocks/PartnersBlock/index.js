import React from 'react'

import Section from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import Partners from 'weplay-events/pages/EventPage/components/Partners'

export default function NewsBlock() {
  return (
    <Section className="u-pt-8 u-pb-0">
      <ContentContainer>
        <Partners />
      </ContentContainer>
    </Section>
  )
}
