import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import ReactInterval from 'react-interval'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import useAction from 'weplay-core/helpers/useAction'
import { getSections } from 'weplay-core/reduxs/sections/actions'
import { NAMES } from 'weplay-core/routes'

import HrefLangLink from 'weplay-components/HrefLangLink'
import LazyDiv from 'weplay-components/LazyDiv'

import PopularArticles from 'weplay-media/pages/MediaPage/PopularArticles/PopularArticles'

import TopArticles from './ABTestBlock/TopArticles'
import TopArticlesDefault from './ABTestDefault/TopArticles'
import TopArticlesSlider from './ABTestSlider/TopArticles'
import ActualArticles from './ActualArticles/ActualArticles'
import container from './container'

const MediaPage = ({
  popularIds,
  latestIds,
  locale,
}) => {
  const { fetchSections } = useAction({ fetchSections: getSections.request })
  const readSections = useCallback(() => fetchSections({ language: locale }), [locale])

  return (
    <>
      <div data-qa-id={dataQaIds.pages[NAMES.MEDIA].container} />
      <HrefLangLink type="/media" />

      <TopArticlesDefault
        latestIds={latestIds}
        readSections={readSections}
      />
      <TopArticlesSlider
        latestIds={latestIds}
        readSections={readSections}
      />
      <TopArticles
        latestIds={latestIds}
        readSections={readSections}
      />
      <PopularArticles popularIds={popularIds} />
      <LazyDiv>
        <ActualArticles
          latestIds={latestIds}
        />
      </LazyDiv>

      <ReactInterval
        timeout={300000}
        callback={readSections}
        enabled
      />
    </>
  )
}

MediaPage.propTypes = {
  popularIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  latestIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  locale: PropTypes.string.isRequired,
}

export default container(MediaPage)
