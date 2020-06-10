import React, { useMemo } from 'react'

import BrandOpportunities from '_dynamic-pages/project/components/BrandOpportunities/BrandOpportunities'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import B2BSection from 'components/B2BSection/B2BSection'
import { brand, event, media } from 'components/Services/ServiceSubMenu/services'

const BrandIntegrationOpportunitiesBlock = () => {
  const t = useTranslation()

  const tabs = useMemo(() => [
    {
      id: 1,
      title: t('services.brandIntegration.title'),
      services: brand,
    }, {
      id: 2,
      title: t('services.mediaRights.title'),
      services: media,
    }, {
      id: 3,
      title: t('services.eventProduction.title'),
      services: event,
    },
  ], [t])

  return (
    <B2BSection title={t('projectPage.BrandOpportunities.title')}>
      <BrandOpportunities tabs={tabs} />
    </B2BSection>
  )
}

export default BrandIntegrationOpportunitiesBlock
