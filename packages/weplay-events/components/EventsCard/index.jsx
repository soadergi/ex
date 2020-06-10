import React from 'react'
import PropTypes from 'prop-types'
import Image from 'weplay-components/Image'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import eventCardPropType from 'weplay-events/customPropTypes/eventCardPropType'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import container from './container'
import styles from './styles.scss'

const EventsCard = ({
  // required props
  isTournamentActive,
  event,

  // container props
  isQualification,
  cardBackground,

  // optional props

  // analytic
  position,
}) => (
  <div className={styles.block}>
    <Image
      className={styles.image}
      src={cardBackground}
      alt=""
    />
    <Header
      event={event}
      isTournamentActive={isTournamentActive}
    />
    <Body
      event={event}
      isTournamentActive={isTournamentActive}
      isQualification={isQualification}
    />
    <Footer
      event={event}
      isQualification={isQualification}
      position={position}
    />
  </div>
)

EventsCard.propTypes = {
  // required props
  event: eventCardPropType.isRequired,

  // container props
  isQualification: PropTypes.bool,
  cardBackground: imgPropType.isRequired,

  // optional props
  isTournamentActive: PropTypes.bool,

  // analytic
  position: PropTypes.string,
}

EventsCard.defaultProps = {
  // optional props
  isQualification: false,
  isTournamentActive: false,
  position: '',
}

export default container(EventsCard)
