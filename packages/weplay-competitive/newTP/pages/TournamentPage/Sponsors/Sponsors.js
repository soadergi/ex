import React from 'react'
import PropTypes from 'prop-types'

import { $isEmpty } from 'weplay-core/$utils/$isEmpty'

import Wrapper from 'weplay-competitive/components/Wrapper'
import sponsorProptype from 'weplay-competitive/customPropTypes/sponsorPropType'

import Sponsor from './Sponsor/Sponsor'
import background from './img/placeholder-white.svg'
import styles from './Sponsors.scss'

const wrapperModification = ['content']

const Sponsors = ({
  // required props
  sponsors,
  // props from container

  // optional props

}) => {
  if ($isEmpty(sponsors)) {
    return null
  }
  return (
    <div className={styles.wrapper}>
      <img
        src={background}
        alt=""
        className={styles.background}
      />
      <Wrapper className={styles.content}>
        <Wrapper modifiers={wrapperModification}>
          <ul className={styles.list}>
            {sponsors.map(sponsor => (
              <Sponsor
                sponsor={sponsor}
                key={sponsor}
              />
            ))}
          </ul>
        </Wrapper>
      </Wrapper>
    </div>
  )
}

Sponsors.propTypes = {
  // required props
  // props from container
  sponsors: PropTypes.arrayOf(sponsorProptype).isRequired,
  // optional props
}

Sponsors.defaultProps = {
  // optional props
}

export default Sponsors
