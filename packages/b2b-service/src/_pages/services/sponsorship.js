import React from 'react'
import Service from 'components/Services/Service'
import image from 'components/Services/img/Sponsorship-min.jpg'
import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

const Sponsorship = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/sponsorship',
    en: 'https://about.weplay.tv/services/sponsorship',
  }

  return (
    <Service
      seoTitle={t('services.sponsorship.title')}
      seoTitleParent={t('services.brandIntegration.title')}
      seoPath="/services/sponsorship"
      seoPathParent="/services/brand-integration"
      imageUrl={image}
      title={t('services.sponsorship.title')}
      text={t('services.sponsorship.text')}
      initialNewspapersAboutEvents={initialNewspapersAboutEvents}
      initialNewspapers={initialNewspapers}
      alternateLinks={alternateLinks}
      serviceName="SPONSORSHIP"
    />
  )
}

Sponsorship.getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default Sponsorship
