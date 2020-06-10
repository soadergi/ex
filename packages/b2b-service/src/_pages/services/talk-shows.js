import React from 'react'
import Service from 'components/Services/Service'
import image from 'components/Services/img/Talk-Shows-Right-min.jpg'
import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

const TalkShows = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/talk-shows',
    en: 'https://about.weplay.tv/services/talk-shows',
  }

  return (
    <Service
      seoTitle={t('services.talkShows.title')}
      seoTitleParent={t('services.brandIntegration.title')}
      seoPath="/services/talk-shows"
      seoPathParent="/services/brand-integration"
      imageUrl={image}
      title={t('services.talkShows.title')}
      text={t('services.talkShows.text')}
      initialNewspapersAboutEvents={initialNewspapersAboutEvents}
      initialNewspapers={initialNewspapers}
      alternateLinks={alternateLinks}
      serviceName="TALK_SHOWS"
    />
  )
}

TalkShows.getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default TalkShows
