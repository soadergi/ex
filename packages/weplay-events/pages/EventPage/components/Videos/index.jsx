import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import Section from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import { getEventMediaResourcesSelector } from 'weplay-events/reduxs/tournamentResources/selectors'
import { VideosListMarkup } from 'weplay-events/components/VideosList'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'

import styles from './styles.scss'

const Videos = () => {
  const tournamentId = useCurrentTournamentId()
  // TODO: @Tony remove i18nTexts when possible
  const i18nTexts = useSelector(i18nTextsSelector)
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const { items } = useSelector(getEventMediaResourcesSelector)(tournamentId)
  const videoUrls = items?.youTube?.linksList

  if (!tournamentId || !videoUrls?.length) return null
  const allVideosUrl = items?.youTube?.allVideosLink

  return (
    <Section className={classNames(
      styles.hasBorderTop,
      'u-py-8',
    )}
    >
      <ContentContainer>
        <VideosListMarkup
          i18nTexts={i18nTexts}
          allVideosUrl={allVideosUrl}
          videoUrls={videoUrls}
          isMobileWidth={isMobileWidth}
        />
      </ContentContainer>
    </Section>
  )
}

export default React.memo(Videos)
