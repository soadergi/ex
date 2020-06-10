import React from 'react'
import PropTypes from 'prop-types'
import ShareBlock from 'weplay-components/ShareBlock/ShareBlock'
import eventCardPropType from 'weplay-events/customPropTypes/eventCardPropType'

import container from './container'
import styles from './styles.scss'

const Footer = ({
  isQualification,
  event,
  // analytic
  position,
}) => (
  <div className={styles.block}>
    <ShareBlock
      color={isQualification ? 'white' : 'hasBorderMultiColored'}
      url={event.detailsLink}
      // analytic
      position={position}
    />
  </div>
)

Footer.propTypes = {
  // required props
  event: eventCardPropType.isRequired,

  // container props

  // optional props
  isQualification: PropTypes.bool,

  // analytic
  position: PropTypes.string.isRequired,
}

Footer.defaultProps = {
  // optional props
  isQualification: false,
}

export default container(Footer)
