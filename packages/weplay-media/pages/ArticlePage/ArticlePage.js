import React from 'react'
import PropTypes from 'prop-types'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import HrefLangLink from 'weplay-components/HrefLangLink'
import PageHelmet from 'weplay-components/PageHelmet'

import container from './container'
import SeoScript from './SeoScript'
import RecursiveNewspaper from './RecursiveNewspaper/RecursiveNewspaper'

const ArticlePage = ({
  // container props
  articleLanguages,
  articleTitles,
  newspaper,
  ogImage,
  relatedNewspaperIds,
  location,
}) => (
  <>
    <PageHelmet
      ogImage={ogImage}
      seoInfo={newspaper.seo}
    />
    <SeoScript
      newspaper={newspaper}
      locationHref={location.href}
    />
    {articleLanguages.length > 1 && ( // eslint-disable-line no-magic-numbers
      <HrefLangLink
        obj={newspaper}
        type="/news"
        articleTitles={articleTitles}
      />
    )}
    <RecursiveNewspaper
      newspaper={newspaper}
      articleLanguages={articleLanguages}
      relatedNewspaperIds={relatedNewspaperIds}
      hasBreadcrumbs
    />
    <div data-qa-id={dataQaIds.pages[NAMES.ARTICLE_SHOW].container} />
  </>
)

ArticlePage.propTypes = {
  // container props
  articleLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  newspaper: newspaperPropType.isRequired,
  articleTitles: PropTypes.shape({}).isRequired,
  ogImage: imgPropType.isRequired,
  relatedNewspaperIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  location: PropTypes.shape({
    href: PropTypes.string,
  }).isRequired,
}

export default container(ArticlePage)
