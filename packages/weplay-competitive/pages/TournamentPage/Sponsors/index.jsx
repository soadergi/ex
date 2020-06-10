import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from 'weplay-competitive/components/Wrapper'
import Sponsor from 'weplay-competitive/pages/TournamentPage/Sponsors/Sponsor'
import AddSponsor from 'weplay-competitive/pages/TournamentPage/Sponsors/AddSponsor'
import sponsorProptype from 'weplay-competitive/customPropTypes/sponsorPropType'

import background from './img/placeholder-white.svg'
import styles from './styles.scss'

const wrapperModification = ['content']

const Sponsors = ({
  // required props
  sponsors,
  // props from container

  // optional props

}) => (
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
              key={sponsor.id}
            />
          ))}
          {/* TODO: part below will be used later for become sponsor */}
          {false && (
          <AddSponsor />
          )}
        </ul>
      </Wrapper>
    </Wrapper>
  </div>
)

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
