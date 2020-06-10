import React from 'react'

import PartnerWithUs from '_dynamic-pages/project/components/PartnerWithUs/PartnerWithUs'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import B2BSection from 'components/B2BSection/B2BSection'

const PartnershipBlock = ({ whyPartnersWithUsBlock }) => {
  const t = useTranslation()
  const isPointsExists = Boolean(whyPartnersWithUsBlock.points.length)

  return isPointsExists
    ? (
      <B2BSection title={t('projectPage.WhyPartnersWithUs.title')}>
        <PartnerWithUs items={whyPartnersWithUsBlock.points} />
      </B2BSection>
    )
    : null
}

export default PartnershipBlock
