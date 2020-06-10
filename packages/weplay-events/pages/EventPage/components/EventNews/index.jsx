import React from 'react'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import SectionHeader from 'weplay-components/SectionHeader'
import NewsSection from 'weplay-events/components/NewsSection'

import { useNewsSection } from './container'

const hasLinkArrow = ['hasLinkArrow']

const EventNews = () => {
  const {
    newsSources,
    specialTagId,
  } = useNewsSection()
  const t = useTranslation()

  return (
    <div>
      <SectionHeader
        title={t('events.eventsNews.title')}
        linkUrl={`${pathWithParamsByRoute(NAMES.SPECIAL_TAG, { specialTagId })}`}
        linkText={t('events.eventsNews.linkText')}
        modifiers={hasLinkArrow}
        hasLinkArrow
      />

      <NewsSection sourcesList={newsSources} />
    </div>
  )
}

export default EventNews
