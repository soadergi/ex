import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Service from 'components/Services/Service'

import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

const BrandContent = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/brand-content',
    en: 'https://about.weplay.tv/services/brand-content',
  }

  return (
    <Service
      seoTitle={t('services.brandContent.title')}
      seoTitleParent={t('services.brandIntegration.title')}
      seoPath="/services/brand-content"
      seoPathParent="/services/event-production"
      imageUrl="https://static-prod.weplay.tv/2019-12-25/0de85c23e4110de4f10008e9452c7f33.5A5047-C3A37D-72B7E1.jpeg" // eslint-disable-line
      title={t('services.brandContent.title')}
      text={t('services.brandContent.text')}
      initialNewspapersAboutEvents={initialNewspapersAboutEvents}
      initialNewspapers={initialNewspapers}
      alternateLinks={alternateLinks}
      serviceName="BRAND_CONTENT"
    />
  )
}

BrandContent.getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default BrandContent
