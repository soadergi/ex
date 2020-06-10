import React from 'react'

import BrandCases from '_dynamic-pages/project/components/BrandCases/BrandCases'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import HeadLine from 'weplay-components/HeadLine'

import B2BSection from 'components/B2BSection/B2BSection'

const MAX_NEWS_QUANTITY = 4

const BrandIntegrationCasesBlock = ({ brandIntegrationNews }) => {
  const t = useTranslation()
  const hasBrandIntegrations = Boolean(brandIntegrationNews.length)
  const slicedNewspapers = brandIntegrationNews.slice(0, MAX_NEWS_QUANTITY)

  return hasBrandIntegrations && (
    <B2BSection>
      <HeadLine
        className="u-text-center"
        title={t('projectPage.common.brandIntegration.title')}
      />
      <BrandCases
        brandIntegrationNews={slicedNewspapers}
      />
    </B2BSection>
  )
}

export default BrandIntegrationCasesBlock
