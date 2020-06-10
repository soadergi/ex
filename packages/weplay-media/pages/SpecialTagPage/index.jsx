import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import PageHelmet from 'weplay-components/PageHelmet'

import NewsInfiniteList from 'weplay-media/components/NewsInfiniteList/NewsInfiniteList'
import TopScreen from 'weplay-media/components/TopScreen'
import specialTagPropType from 'weplay-media/customPropTypes/specialTagPropType'
import { useBigBannerByTag } from 'weplay-media/components/BigBanner/useBigBannerByTag'

import container from './container'

const SpecialTagPage = ({
  specialTag,
  seoInfo,
  specialTagId,
}) => {
  const { locale } = useLocale()
  const { bigBanner } = useBigBannerByTag([{
    tagType: 'specialTag',
    tagTypeId: specialTag.specialTagTranslateId,
    language: locale,
  }])
  const specialTagsIds = useMemo(() => [specialTagId], [specialTagId])
  return (
    <>
      <TopScreen
        bgImage={specialTag.bgImage.path}
        bgColor={specialTag.bgColor}
        entityName={specialTag.name}
        stickerSrc={specialTag.avatar.path}
        stickerAlt=""
        title={specialTag.name}
        text={specialTag.shortDescription}
      />

      <div
        className="u-py-2 u-py-md-4"
        data-qa-id={dataQaIds.pages[NAMES.SPECIAL_TAG].container}
      >
        <ContentContainer>
          <PageHelmet
            seoInfo={seoInfo}
          />
          <NewsInfiniteList
            isHiddenSpecialTag
            specialTagsIds={specialTagsIds}
            bigBanner={bigBanner}
            articleModifier="inline"
          />
        </ContentContainer>
      </div>
    </>
  )
}

SpecialTagPage.propTypes = {
  specialTag: specialTagPropType,
  // TODO: extract to custom props
  seoInfo: PropTypes.shape().isRequired,
  specialTagId: PropTypes.string.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
}
SpecialTagPage.defaultProps = {
  specialTag: null,
}

export default container(SpecialTagPage)
