import React from 'react'
import Service from 'components/Services/Service'
import image from 'components/Services/img/Native-Integration-min.jpg'
import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

const NativeIntegration = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/native-integration',
    en: 'https://about.weplay.tv/services/native-integration',
  }

  return (
    <Service
      seoTitle={t('services.nativeIntegration.title')}
      seoTitleParent={t('services.brandIntegration.title')}
      seoPath="/services/native-integration"
      seoPathParent="/services/brand-integration"
      imageUrl={image}
      title={t('services.nativeIntegration.title')}
      text={t('services.nativeIntegration.text')}
      initialNewspapersAboutEvents={initialNewspapersAboutEvents}
      initialNewspapers={initialNewspapers}
      alternateLinks={alternateLinks}
      serviceName="NATIVE_INTEGRATION"
    />
  )
}

NativeIntegration.getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default NativeIntegration
