import React from 'react'
import ServiceCategory from 'components/Services/ServiceCategory'
import { event } from 'components/Services/ServiceSubMenu/services'
import image from 'components/Services/img/event.jpg'
import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

const EventProduction = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/event-production',
    en: 'https://about.weplay.tv/services/event-production',
  }

  return (
    <ServiceCategory
      seoTitle={t('services.eventProduction.title')}
      seoPath="/services/event-production"
      imageUrl={image}
      title={t('services.eventProduction.title')}
      text={t('services.eventProduction.text')}
      initialNewspapersAboutEvents={initialNewspapersAboutEvents}
      initialNewspapers={initialNewspapers}
      alternateLinks={alternateLinks}
      services={event}
      serviceName="EVENT_PRODUCTION"
    />
  )
}

EventProduction.getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default EventProduction
