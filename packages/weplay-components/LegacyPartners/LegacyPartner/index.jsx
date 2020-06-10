import React from 'react'
import PropTypes from 'prop-types'

import container from './container'
import styles from './styles.scss'

const Partner = ({
  partner,
  logSponsorClick,
}) => (
  <li className={styles.item}>
    <a
      href={partner.url}
      rel="noopener noreferrer"
      target="_blank"
      className={styles.link}
      onClick={logSponsorClick}
      data-analytics-action={`${partner.title} logo (bottom)`}
    >
      <img
        src={partner.logo}
        alt={partner.title}
        className={styles.img}
      />
    </a>
  </li>
)

Partner.propTypes = {
  partner: PropTypes.shape({
    url: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  logSponsorClick: PropTypes.func.isRequired,
}

export default container(Partner)
