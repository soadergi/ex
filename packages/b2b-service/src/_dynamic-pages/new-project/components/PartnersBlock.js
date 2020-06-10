import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import LegacyPartners from 'weplay-components/LegacyPartners'

import B2BSection from 'components/B2BSection/B2BSection'

import classes from '../styles.scss'
import { getLegacyPartners } from '../helpers'

const PartnersBlock = ({ partners }) => {
  const t = useTranslation()
  const legacyPartners = getLegacyPartners(partners)
  const isPartnersExists = Boolean(legacyPartners.length)

  return isPartnersExists && (
    <B2BSection>
      <LegacyPartners
        className={classes.partners}
        partners={legacyPartners || []}
        partnersTitle={t('projectPage.common.partners.title')}
      />
    </B2BSection>
  )
}

export default PartnersBlock
