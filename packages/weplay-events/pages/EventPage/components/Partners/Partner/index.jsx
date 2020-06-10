import React from 'react'
import PropTypes from 'prop-types'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import Link from 'weplay-components/Link'
import Image from 'weplay-components/Image'

import styles from './styles.scss'

const Partner = ({ partner }) => (
  <li className={styles.item}>
    <span className={styles.title}>{partner.partnershipType}</span>
    <Link
      to={partner.url}
      isExternal
      className={styles.link}
      {...getAnalyticsAttributes({
        category: 'partner',
        action: `${partner.alt} logo (bottom)`,
        label: LOOKUP,
      })}
    >
      <Image
        src={partner.logoUrl}
        alt={partner.alt}
        className={styles.img}
      />
    </Link>
  </li>
)

Partner.propTypes = {
  partner: PropTypes.shape({
    partnershipType: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    logoUrl: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
}

export default React.memo(Partner)
