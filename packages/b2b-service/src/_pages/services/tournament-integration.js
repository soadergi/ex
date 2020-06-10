import React from 'react'
import Service from 'components/Services/Service'
import image from 'components/Services/img/Tournament-Integration-min.jpg'
import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

const TournamentIntegration = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/tournament-integration',
    en: 'https://about.weplay.tv/services/tournament-integration',
  }

  return (
    <Service
      seoTitle={t('services.tournamentIntegration.title')}
      seoTitleParent={t('services.brandIntegration.title')}
      seoPath="/services/tournament-integration"
      seoPathParent="/services/brand-integration"
      imageUrl={image}
      title={t('services.tournamentIntegration.title')}
      text={t('services.tournamentIntegration.text')}
      initialNewspapersAboutEvents={initialNewspapersAboutEvents}
      initialNewspapers={initialNewspapers}
      alternateLinks={alternateLinks}
      serviceName="TOURNAMENT_INTEGRATION"
    />
  )
}

TournamentIntegration
  .getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default TournamentIntegration
