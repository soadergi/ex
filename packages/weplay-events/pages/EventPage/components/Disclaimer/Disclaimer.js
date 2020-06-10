import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import Section from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import SeoBlock from 'weplay-components/SeoBlock/SeoBlock'

import { getSeoSnippetByTournamentIdSelector } from 'weplay-events/reduxs/seoSnippet/selectors'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'

function Disclaimer() {
  const tournamentId = useCurrentTournamentId()
  const getSeoSnippetByTournamentId = useSelector(getSeoSnippetByTournamentIdSelector)

  const {
    disclaimerHeader,
    disclaimerDescription,
  } = useMemo(() => getSeoSnippetByTournamentId(tournamentId), [getSeoSnippetByTournamentId, tournamentId])

  if (!disclaimerHeader && !disclaimerDescription) return null

  return (
    <Section className="u-pt-8 u-pb-0">
      <ContentContainer>
        <SeoBlock
          title={disclaimerHeader}
          content={disclaimerDescription}
          isDisclaimer
        />
      </ContentContainer>
    </Section>
  )
}

export default React.memo(Disclaimer)
