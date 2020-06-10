import React from 'react'
import sponsorProptype from 'weplay-competitive/customPropTypes/sponsorPropType'

import styles from './styles.scss'

const Sponsor = ({
  // required props
  sponsor,
  // props from container

  // optional props
}) => (
  <li className={styles.item}>
    <a
      href={sponsor.url}
      rel="noreferrer noopener"
      target="_blank"
      className={styles.link}
    >
      <img
        src={sponsor.logo}
        alt="logo"
        className={styles.image}
      />
    </a>
  </li>
)

Sponsor.propTypes = {
  // required props
  sponsor: sponsorProptype.isRequired,
  // props from container

  // optional props
}

Sponsor.defaultProps = {
  // optional props
}

export default Sponsor
