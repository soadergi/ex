import React from 'react'
import Service from 'components/Services/Service'
import image from 'components/Services/img/VOD-Rights-min.jpg'
import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

const VodRights = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/vod-rights',
    en: 'https://about.weplay.tv/services/vod-rights',
  }

  return (
    <Service
      seoTitle={t('services.vodRights.title')}
      seoTitleParent={t('services.mediaRights.title')}
      seoPath="/services/vod-rights"
      seoPathParent="/services/media-rights"
      imageUrl={image}
      title={t('services.vodRights.title')}
      text={t('services.vodRights.text')}
      initialNewspapersAboutEvents={initialNewspapersAboutEvents}
      initialNewspapers={initialNewspapers}
      alternateLinks={alternateLinks}
      serviceName="VOD_RIGHTS"
    />
  )
}

VodRights.getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default VodRights
