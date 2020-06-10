import React from 'react'
import PropTypes from 'prop-types'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import LegacyPartners from 'weplay-components/LegacyPartners'

import { partnerPropType } from 'weplay-events/customPropTypes'

import styles from './styles.scss'
import container from './container'

const EventPartners = ({
  i18nTexts,
  mediaPartners,
  partners,
  showPartners,
  showMediaPartners,
}) => (
  <div className={styles.block}>
    <ContentContainer>
      {showMediaPartners && (
        <LegacyPartners
          partnersTitle={i18nTexts.partners.mediaPartners}
          partners={mediaPartners}
        />
      )}

      {showPartners && (
        <LegacyPartners
          partnersTitle={i18nTexts.partners.partners}
          partners={partners}
        />
      )}
    </ContentContainer>
  </div>
)

EventPartners.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  partners: PropTypes.arrayOf(partnerPropType).isRequired,
  mediaPartners: PropTypes.arrayOf(partnerPropType).isRequired,
  showPartners: PropTypes.bool.isRequired,
  showMediaPartners: PropTypes.bool.isRequired,
}

export default container(EventPartners)
