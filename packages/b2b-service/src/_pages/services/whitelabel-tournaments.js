import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Service from 'components/Services/Service'

import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

const WhitelabelTournaments = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/whitelabel-tournaments',
    en: 'https://about.weplay.tv/services/whitelabel-tournaments',
  }

  return (
    <Service
      seoTitle={t('services.whitelabelTournaments.title')}
      seoTitleParent={t('services.eventProduction.title')}
      seoPath="/services/whitelabel-tournaments"
      seoPathParent="/services/event-production"
      imageUrl="https://static-prod.weplay.tv/2019-12-25/2fad9877ef2cfc19656d277f56ed2dab.1A1D33-BCACAF-6E99B7.jpeg" // eslint-disable-line
      title={t('services.whitelabelTournaments.title')}
      text={t('services.whitelabelTournaments.text')}
      initialNewspapersAboutEvents={initialNewspapersAboutEvents}
      initialNewspapers={initialNewspapers}
      alternateLinks={alternateLinks}
      serviceName="WHITELABEL_TOURNAMENTS"
    />
  )
}

WhitelabelTournaments
  .getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default WhitelabelTournaments
