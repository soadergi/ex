import React from 'react'
import Service from 'components/Services/Service'
import image from 'components/Services/img/Talk-Shows-min.jpg'
import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

const TalkShowsRights = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/talk-shows-rights',
    en: 'https://about.weplay.tv/services/talk-shows-rights',
  }

  return (
    <Service
      seoTitle={t('services.talkShowsRights.title')}
      seoTitleParent={t('services.mediaRights.title')}
      seoPath="/services/talk-shows-rights"
      seoPathParent="/services/media-rights"
      imageUrl={image}
      title={t('services.talkShowsRights.title')}
      text={t('services.talkShowsRights.text')}
      initialNewspapersAboutEvents={initialNewspapersAboutEvents}
      initialNewspapers={initialNewspapers}
      alternateLinks={alternateLinks}
      serviceName="TALK_SHOWS_RIGHTS"
    />
  )
}

TalkShowsRights.getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default TalkShowsRights
