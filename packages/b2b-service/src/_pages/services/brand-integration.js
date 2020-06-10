import React from 'react'
import ServiceCategory from 'components/Services/ServiceCategory'
import { brand } from 'components/Services/ServiceSubMenu/services'
import image from 'components/Services/img/brand.jpg'
import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

const BrandIntegration = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/brand-integration',
    en: 'https://about.weplay.tv/services/brand-integration',
  }

  return (
    <ServiceCategory
      seoTitle={t('services.brandIntegration.title')}
      seoPath="/services/brand-integration"
      imageUrl={image}
      title={t('services.brandIntegration.title')}
      text={t('services.brandIntegration.text')}
      initialNewspapersAboutEvents={initialNewspapersAboutEvents}
      initialNewspapers={initialNewspapers}
      alternateLinks={alternateLinks}
      services={brand}
      serviceName="BRAND_INTEGRATION"
    />
  )
}

BrandIntegration.getInitialProps = ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default BrandIntegration
