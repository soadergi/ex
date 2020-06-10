import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Section from 'weplay-components/_wrappers/Section'
import Image from 'weplay-components/Image'

import SubscribeBanner from 'weplay-events/components/SubscribeBanner'
import useCurrentTournamentStatus from 'weplay-events/pages/EventPage/hooks/useCurrentTournamentStatus'

import styles from './styles.scss'

export default function TournamentBanner() {
  const t = useTranslation()
  const { isUpcoming } = useCurrentTournamentStatus()

  if (isUpcoming) return null

  return (
    <Section className="u-pt-8 u-pb-0">
      <SubscribeBanner
        className={styles.subscribeTournamentBanner}
        title={t('events.tournamentBanner.title')}
        description={t('events.tournamentBanner.description')}
        linkText={t('events.tournamentBanner.linkText')}
        contentPosition="right"
        bannerLink="/tournaments/dota2"
      >
        <Image
          className={styles.tournamentDecorationImage}
          src="https://static-prod.weplay.tv/2020-03-11/2239a18d32586b6908c4e0cd991ed59c.37221F-D79881-99969B.png"
          alt=""
        />
      </SubscribeBanner>
    </Section>
  )
}
