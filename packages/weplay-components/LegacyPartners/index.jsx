import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import LegacyPartner from './LegacyPartner'

const LegacyPartners = ({
  partners,
  partnersTitle,
  className,
}) => (
  <div className={classNames(
    styles.block,
    className,
  )}
  >
    <h2 className={styles.title}>
      {partnersTitle}
    </h2>

    <ul className={styles.list}>
      {partners.map(partner => (
        <LegacyPartner
          sponsorTitle={partner.title}
          key={partner.title}
          partner={partner}
        />
      ))}
    </ul>
  </div>
)

LegacyPartners.propTypes = {
  partnersTitle: PropTypes.string.isRequired,
  partners: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,

  // optional props
  className: PropTypes.string,
}

LegacyPartners.defaultProps = {
  className: '',
}

export default React.memo(LegacyPartners)
