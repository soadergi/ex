import React from 'react'

import sponsorProptype from 'weplay-competitive/customPropTypes/sponsorPropType'

import styles from './Sponsor.scss'

const Sponsor = ({
  // required props
  sponsor,
  // props from container

  // optional props
}) => (
  <li className={styles.item}>
    <p>
      Sponsor here -
      {sponsor}
    </p>
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
