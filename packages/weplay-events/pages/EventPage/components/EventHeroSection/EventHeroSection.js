import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import HeroSection from 'weplay-components/HeroSection'
import Image from 'weplay-components/Image'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import ButtonsBlock from 'weplay-events/components/ButtonsBlock'
import HeroSectionLabels from 'weplay-events/pages/EventPage/components/HeroSectionLabels'
import {
  subscriptionScopeIds,
  TOURNAMENT_STATUSES,
  TOURNAMENT_SLUGS_WITH_TICKETS,
} from 'weplay-events/pages/EventPage/constants'
import useCurrentTournament from 'weplay-events/pages/EventPage/hooks/useCurrentTournament'

import TournamentWinners from './TournamentWinners/TournamentWinners'
import TournamentInfo from './TournamentInfo/TournamentInfo'
import styles from './styles.scss'

const isTournamentWithTickets = slug => TOURNAMENT_SLUGS_WITH_TICKETS.includes(slug)

const EventHeroSection = () => {
  const t = useTranslation()
  const tournament = useCurrentTournament()
  const isLoggedIn = useSelector(isLoggedInSelector)

  const withDownloadTicketButton = useMemo(
    () => isTournamentWithTickets(tournament.slug) && tournament.status !== TOURNAMENT_STATUSES.ENDED,
    [tournament],
  )

  return (
    <HeroSection
      className={styles.heroSection}
      image={tournament.backgroundUrl}
    >
      <ContentContainer>
        <div className={styles.mainWrap}>
          <div className={styles.wrapLogo}>
            {tournament.logoUrl && (
              <Image
                className={styles.logo}
                src={tournament.logoUrl}
                alt="logo"
              />
            )}
          </div>

          <div
            className={styles.wrapInfo}
            data-event-position="EventMainBlock"
          >
            {tournament.labels && (
              <div className={styles.labels}>
                <HeroSectionLabels labels={tournament.labels} />
              </div>
            )}

            <p className={styles.title}>{tournament.fullName}</p>

            <p className={styles.description}>{tournament.description}</p>

            {tournament.isFetched && <TournamentInfo tournament={tournament} />}

            {tournament.status === TOURNAMENT_STATUSES.ENDED && (
              <TournamentWinners tournamentId={tournament.id} />
            )}

            <ButtonsBlock
              color="magenta"
              data-event-position="MainBlock"
              modalTitle={tournament.fullName}
              subscriptionScopeId={subscriptionScopeIds[tournament.slug]}
              withDownloadTicketButton={withDownloadTicketButton}
              hint={isLoggedIn ? '' : t('events.eventHeroSection.hint')}
            />
          </div>
        </div>
      </ContentContainer>
    </HeroSection>
  )
}

export default EventHeroSection
