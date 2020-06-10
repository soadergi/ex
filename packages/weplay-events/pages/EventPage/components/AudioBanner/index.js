import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { isMobileWidthSelector, isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { getActiveTournamentLiveStreamSelector } from 'weplay-core/reduxs/activeTournament/selectors'

import Section from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import useCurrentTournamentStatus from 'weplay-events/pages/EventPage/hooks/useCurrentTournamentStatus'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'

import AudioWave from './AudioWave'
import AudioPlayer from './AudioPlayer'
import CallToActionContent from './CallToActionContent'
import styles from './style.scss'

const AudioBanner = () => {
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const isTabletWidth = useSelector(isTabletWidthSelector)
  const isLoggedIn = useSelector(isLoggedInSelector)

  const { tournamentId } = useSelector(getActiveTournamentLiveStreamSelector)
  const currentTournamentId = useCurrentTournamentId()
  const { isOngoing } = useCurrentTournamentStatus()

  const isVisible = useMemo(
    () => tournamentId === currentTournamentId,
    [tournamentId, currentTournamentId],
  )

  if (!isVisible || !isOngoing) return null

  return (
    <Section className={classNames(styles.section, 'u-py-5')}>
      <ContentContainer>
        <div className={styles.block}>
          {isLoggedIn ? <AudioPlayer /> : <CallToActionContent />}

          {(!isMobileWidth && !isTabletWidth) && <AudioWave />}
        </div>
      </ContentContainer>
    </Section>
  )
}

export default AudioBanner
