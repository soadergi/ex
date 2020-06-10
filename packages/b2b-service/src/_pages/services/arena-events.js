import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Service from 'components/Services/Service'

import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

// TODO rewrite all services to one universal template file
const ArenaEvents = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/arena-events',
    en: 'https://about.weplay.tv/services/arena-events',
  }

  return (
    <Service
      seoTitle={t('services.arenaEvents.title')}
      seoTitleParent={t('services.eventProduction.title')}
      seoPath="/services/arena-events"
      seoPathParent="/services/event-production"
      imageUrl="https://static-prod.weplay.tv/2019-06-26/2d0baa2f49e6667a112df2c21d230d0b.jpeg"
      title={t('services.arenaEvents.title')}
      text={t('services.arenaEvents.text')}
      initialNewspapersAboutEvents={initialNewspapersAboutEvents}
      initialNewspapers={initialNewspapers}
      alternateLinks={alternateLinks}
      serviceName="ARENA_EVENTS"
    />
  )
}

ArenaEvents.getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default ArenaEvents
