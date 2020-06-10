import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Service from 'components/Services/Service'

import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

const CreativeDev = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/creative-dev',
    en: 'https://about.weplay.tv/services/creative-dev',
  }

  return (
    <>
      <Service
        seoTitle={t('services.creativeDev.title')}
        seoTitleParent={t('services.eventProduction.title')}
        seoPath="/services/creative-dev"
        seoPathParent="/services/event-production"
        imageUrl="https://static-prod.weplay.tv/2019-06-26/2d0baa2f49e6667a112df2c21d230d0b.jpeg"
        title={t('services.creativeDev.title')}
        text={t('services.creativeDev.text')}
        initialNewspapersAboutEvents={initialNewspapersAboutEvents}
        initialNewspapers={initialNewspapers}
        alternateLinks={alternateLinks}
        serviceName="CREATIVE_DEV"
      />
    </>
  )
}

CreativeDev.getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default CreativeDev
