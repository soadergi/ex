import React from 'react'
import Service from 'components/Services/Service'
import image from 'components/Services/img/Broadcast-Rights-min.jpg'
import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

const BroadcastingRights = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/broadcasting-rights',
    en: 'https://about.weplay.tv/services/broadcasting-rights',
  }

  return (
    <Service
      seoTitle={t('services.broadcastingRights.title')}
      seoTitleParent={t('services.mediaRights.title')}
      seoPath="/services/broadcasting-rights"
      seoPathParent="/services/media-rights"
      imageUrl={image}
      title={t('services.broadcastingRights.title')}
      text={t('services.broadcastingRights.text')}
      initialNewspapersAboutEvents={initialNewspapersAboutEvents}
      initialNewspapers={initialNewspapers}
      alternateLinks={alternateLinks}
      serviceName="BROADCASTING_RIGHTS"
    />
  )
}

BroadcastingRights.getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default BroadcastingRights
