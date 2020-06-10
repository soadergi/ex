import React from 'react'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import Calendar from 'weplay-events/components/Calendar'
import Seo from 'weplay-events/pages/EventPage/components/Seo'

import NewsBlock from '../blocks/NewsBlock'
import CharityPlayBlock from '../blocks/CharityPlayBlock/CharityPlayBlock'

const Overview = () => (
  <div className="u-pb-8">
    <CharityPlayBlock />

    <NewsBlock />

    <Calendar />

    <Seo />
  </div>
)

export default withPageViewAnalytics()(Overview)
