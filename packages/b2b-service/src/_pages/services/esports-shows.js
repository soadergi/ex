import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Service from 'components/Services/Service'

import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

const EsportsShows = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/esports-shows',
    en: 'https://about.weplay.tv/services/esports-shows',
  }

  return (
    <Service
      seoTitle={t('services.esportsShows.title')}
      seoTitleParent={t('services.eventProduction.title')}
      seoPath="/services/esports-shows"
      seoPathParent="/services/event-production"
      imageUrl="https://static-prod.weplay.tv/2019-12-25/65fa60a7a3881d773293a5210065c4ec.C14E6D-280B13-E5C7DB.jpeg" // eslint-disable-line
      title={t('services.esportsShows.title')}
      text={t('services.esportsShows.text')}
      initialNewspapersAboutEvents={initialNewspapersAboutEvents}
      initialNewspapers={initialNewspapers}
      alternateLinks={alternateLinks}
      serviceName="ESPORTS_SHOWS"
    />
  )
}

EsportsShows.getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default EsportsShows
