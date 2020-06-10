import React from 'react'
import Service from 'components/Services/Service'
import image from 'components/Services/img/PR-SMM-min.jpg'
import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

const PrSmm = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/pr-smm',
    en: 'https://about.weplay.tv/services/pr-smm',
  }

  return (
    <Service
      seoTitle={t('services.prSmm.title')}
      seoTitleParent={t('services.brandIntegration.title')}
      seoPath="/services/pr-smm"
      seoPathParent="/services/brand-integration"
      imageUrl={image}
      title={t('services.prSmm.title')}
      text={t('services.prSmm.text')}
      initialNewspapersAboutEvents={initialNewspapersAboutEvents}
      initialNewspapers={initialNewspapers}
      alternateLinks={alternateLinks}
      serviceName="PR_SMM"
    />
  )
}

PrSmm.getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default PrSmm
