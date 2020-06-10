import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import Section from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import PageHelmet from 'weplay-components/PageHelmet'
import HrefLangLink from 'weplay-components/HrefLangLink'
import SeoBlock from 'weplay-components/SeoBlock/SeoBlock'

import unusualTagPropType from 'weplay-media/customPropTypes/unusualTagPropType'
import TopScreen from 'weplay-media/components/TopScreen'
import NewsInfiniteList from 'weplay-media/components/NewsInfiniteList/NewsInfiniteList'
import { useBigBannerByTag } from 'weplay-media/components/BigBanner/useBigBannerByTag'

import container from './container'

const UnusualTagPage = ({
  unusualTag,
  goToRoot,
  seoInfo,
  unusualTagId,
  seoText,
}) => {
  const { locale } = useLocale()
  const { bigBanner } = useBigBannerByTag([{
    tagType: 'unusualTag',
    tagTypeId: unusualTag.tagId,
    language: locale,
  }])
  const unusualTagsIds = useMemo(() => [unusualTagId], [unusualTagId])

  return (
    <>
      <PageHelmet
        seoInfo={seoInfo}
      />
      <HrefLangLink
        obj={unusualTag}
        type="/unusual-tags"
      />

      <TopScreen
        bgImage={unusualTag.bgImage.path}
        entityName={unusualTag.name}
        stickerAlt=""
        text={unusualTag.description}
        handleClick={goToRoot}
        listingTitle={unusualTag.name}
        modifier="blockLight"
      />
      <Section>
        <ContentContainer>
          {seoText && (
          <div className="u-mb-6">
            <SeoBlock content={seoText} />
          </div>
          )}
          <NewsInfiniteList
            unusualTagsIds={unusualTagsIds}
            currentTagUrl={unusualTag.url}
            bigBanner={bigBanner}
            articleModifier="inline"
          />
        </ContentContainer>
      </Section>
      <div data-qa-id={dataQaIds.pages[NAMES.UNUSUAL_TAG].container} />
    </>
  )
}

UnusualTagPage.propTypes = {
  unusualTag: unusualTagPropType,
  goToRoot: PropTypes.func.isRequired,
  seoInfo: PropTypes.shape().isRequired,
  unusualTagId: PropTypes.string.isRequired,
  seoText: PropTypes.string.isRequired,
}

UnusualTagPage.defaultProps = {
  unusualTag: null,
}

export default container(UnusualTagPage)
