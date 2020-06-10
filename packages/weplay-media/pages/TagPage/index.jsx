import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import PageHelmet from 'weplay-components/PageHelmet'
import Breadcrumbs from 'weplay-components/Breadcrumbs'
import HrefLangLink from 'weplay-components/HrefLangLink'
import SeoBlock from 'weplay-components/SeoBlock/SeoBlock'

import ListingTitle from 'weplay-media/components/ListingTitle'
import { useBigBannerByTag } from 'weplay-media/components/BigBanner/useBigBannerByTag'
import NewsInfiniteList from 'weplay-media/components/NewsInfiniteList/NewsInfiniteList'

import container from './container'

const TagPage = ({
  tag,
  tagName,
  goToRoot,
  seoInfo,
  tagId,
  seoText,
}) => {
  const { locale } = useLocale()
  const { bigBanner } = useBigBannerByTag([{
    tagType: 'tag',
    tagTypeId: tag.tagId,
    language: locale,
  }])
  const tagsIds = useMemo(() => [tagId], [tagId])

  return (
    <>
      <PageHelmet
        seoInfo={seoInfo}
      />
      <HrefLangLink
        obj={tag}
        type="/tags"
      />

      <div
        className="u-py-2 u-py-md-4"
        data-qa-id={dataQaIds.pages[NAMES.TAG_SHOW].container}
      >
        <ContentContainer>
          <Breadcrumbs
            entityName={tagName}
          />
          <ListingTitle
            handleClick={goToRoot}
            title={tagName}
          />
          {seoText && (
            <div className="u-mb-6">
              <SeoBlock content={seoText} />
            </div>
          )}
          <NewsInfiniteList
            tagsIds={tagsIds}
            currentTagUrl={tag.url}
            bigBanner={bigBanner}
            isHiddenNewsShown
            articleModifier="inline"
          />
        </ContentContainer>
      </div>
    </>
  )
}

TagPage.propTypes = {
  tag: PropTypes.shape({
    tagId: PropTypes.number,
    url: PropTypes.string,
  }).isRequired,
  tagName: PropTypes.string.isRequired,
  goToRoot: PropTypes.func.isRequired,
  seoInfo: PropTypes.shape().isRequired,
  tagId: PropTypes.string.isRequired,
  seoText: PropTypes.string.isRequired,
}

TagPage.defaultProps = {
}

export default container(TagPage)
