import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import Section from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import SeoBlock from 'weplay-components/SeoBlock/SeoBlock'

import { getSeoSnippetByTournamentIdSelector } from 'weplay-events/reduxs/seoSnippet/selectors'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'

export default function Seo() {
  const tournamentId = useCurrentTournamentId()
  const getSeoSnippetByTournamentId = useSelector(getSeoSnippetByTournamentIdSelector)

  const {
    seoTextHeader,
    seoTextDescription,
  } = useMemo(() => getSeoSnippetByTournamentId(tournamentId), [getSeoSnippetByTournamentId, tournamentId])

  if (!seoTextHeader && !seoTextDescription) return null

  return (
    <Section className="u-pt-8 u-pb-0">
      <ContentContainer>
        <SeoBlock
          title={seoTextHeader}
          content={seoTextDescription}
        />
      </ContentContainer>
    </Section>
  )
}
